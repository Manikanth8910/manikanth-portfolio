#!/usr/bin/env python3
"""
Automated Portfolio Uptime & Observability Bot
Pings all production endpoints, verifies SSL certificates, measures latency,
generates GitHub Actions summary reports, and sends optional webhook alerts.
"""

import os
import sys
import time
import socket
import ssl
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone

try:
    import certifi
    SSL_CA_FILE = certifi.where()
except ImportError:
    SSL_CA_FILE = None

TARGET_HOST = "mani8910.vercel.app"
BASE_URL = f"https://{TARGET_HOST}"

ENDPOINTS = [
    {"name": "Homepage", "path": "/", "expected_content": "<title>"},
    {"name": "About Route", "path": "/about", "expected_content": "root"},
    {"name": "Projects Route", "path": "/projects", "expected_content": "root"},
    {"name": "Contact Route", "path": "/contact", "expected_content": "root"},
    {"name": "Resume PDF", "path": "/manikanth_panuganti.pdf", "is_binary": True},
]


def check_ssl(hostname, port=443):
    """Check SSL certificate validity and days remaining until expiration."""
    try:
        if SSL_CA_FILE:
            ctx = ssl.create_default_context(cafile=SSL_CA_FILE)
        else:
            ctx = ssl.create_default_context()
        with socket.create_connection((hostname, port), timeout=10) as sock:
            with ctx.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                expiry_str = cert["notAfter"]
                # Format: 'Jan 29 11:46:09 2027 GMT'
                expiry_date = datetime.strptime(expiry_str, "%b %d %H:%M:%S %Y %Z").replace(tzinfo=timezone.utc)
                now = datetime.now(timezone.utc)
                days_left = (expiry_date - now).days
                issuer = dict(x[0] for x in cert.get("issuer", ()))
                issuer_org = issuer.get("organizationName", issuer.get("commonName", "Unknown"))
                return {
                    "ok": True,
                    "issuer": issuer_org,
                    "expires_at": expiry_date.strftime("%Y-%m-%d"),
                    "days_left": days_left,
                }
    except Exception as e:
        return {"ok": False, "error": str(e), "days_left": -1}


def probe_endpoint(endpoint, max_retries=2):
    """Probe an endpoint with retry mechanism to prevent transient false positives."""
    url = f"{BASE_URL}{endpoint['path']}"
    headers = {"User-Agent": "Portfolio-UptimeBot/1.0 (+https://github.com/Manikanth8910/manikanth-portfolio)"}

    last_res = None
    for attempt in range(max_retries + 1):
        start = time.perf_counter()
        try:
            ctx = ssl.create_default_context(cafile=SSL_CA_FILE) if SSL_CA_FILE else None
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=8, context=ctx) as resp:
                latency_ms = round((time.perf_counter() - start) * 1000, 1)
                status_code = resp.status
                content = resp.read()
                vercel_cache = resp.headers.get("x-vercel-cache", "N/A")
                vercel_id = resp.headers.get("x-vercel-id", "N/A").split("::")[0] if resp.headers.get("x-vercel-id") else "N/A"

                content_ok = True
                if endpoint.get("is_binary"):
                    if not content.startswith(b"%PDF"):
                        content_ok = False
                elif endpoint.get("expected_content"):
                    if endpoint["expected_content"] not in content.decode("utf-8", errors="ignore"):
                        content_ok = False

                return {
                    "name": endpoint["name"],
                    "url": url,
                    "status_code": status_code,
                    "latency_ms": latency_ms,
                    "vercel_cache": vercel_cache,
                    "vercel_node": vercel_id,
                    "content_ok": content_ok,
                    "ok": status_code == 200 and content_ok,
                    "error": None,
                }
        except urllib.error.HTTPError as e:
            latency_ms = round((time.perf_counter() - start) * 1000, 1)
            last_res = {
                "name": endpoint["name"],
                "url": url,
                "status_code": e.code,
                "latency_ms": latency_ms,
                "vercel_cache": "ERROR",
                "vercel_node": "N/A",
                "content_ok": False,
                "ok": False,
                "error": f"HTTP {e.code}: {e.reason}",
            }
            # For 4xx/5xx, retry once
            if attempt < max_retries:
                time.sleep(0.5)
                continue
            return last_res
        except Exception as e:
            latency_ms = round((time.perf_counter() - start) * 1000, 1)
            last_res = {
                "name": endpoint["name"],
                "url": url,
                "status_code": 0,
                "latency_ms": latency_ms,
                "vercel_cache": "ERROR",
                "vercel_node": "N/A",
                "content_ok": False,
                "ok": False,
                "error": str(e),
            }
            if attempt < max_retries:
                time.sleep(0.5)
                continue
            return last_res

    return last_res


def send_webhook_alert(webhook_url, message):
    """Optionally send alerts to Discord/Slack webhook."""
    try:
        data = json.dumps({"content": message, "text": message}).encode("utf-8")
        req = urllib.request.Request(
            webhook_url,
            data=data,
            headers={"Content-Type": "application/json", "User-Agent": "Portfolio-UptimeBot/1.0"},
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            pass
    except Exception as e:
        print(f"[!] Failed to send webhook alert: {e}", file=sys.stderr)


def write_github_summary(ssl_info, results, overall_ok):
    """Write markdown summary to GITHUB_STEP_SUMMARY if running in GitHub Actions."""
    summary_path = os.getenv("GITHUB_STEP_SUMMARY")
    if not summary_path:
        return

    status_icon = "🟢 **All Systems Operational**" if overall_ok else "🔴 **Incident Detected - Endpoint Down**"
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    lines = [
        f"## 🛰️ Portfolio Observability & Uptime Report",
        f"",
        f"**Status**: {status_icon}  ",
        f"**Checked At**: `{timestamp}`  ",
        f"**Target Host**: [{TARGET_HOST}]({BASE_URL})  ",
        f"",
        f"### 🔒 SSL / TLS Status",
        f"- **Issuer**: `{ssl_info.get('issuer', 'N/A')}`",
        f"- **Expiration**: `{ssl_info.get('expires_at', 'N/A')}` ({ssl_info.get('days_left', 'N/A')} days remaining)",
        f"- **Status**: {'✅ Valid' if ssl_info.get('ok') and ssl_info.get('days_left', 0) > 14 else '⚠️ Warning / Expiring Soon'}",
        f"",
        f"### 📊 Endpoint Health Checks",
        f"| Endpoint | Status | Latency | Edge Node | Cache | Health |",
        f"|---|---|---|---|---|---|",
    ]

    for r in results:
        badge = "✅ 200 OK" if r["ok"] else f"❌ {r['status_code']} ({r['error']})"
        lines.append(
            f"| **{r['name']}** (`{r['url'].replace(BASE_URL, '') or '/'}`) | `{r['status_code']}` | `{r['latency_ms']} ms` | `{r['vercel_node']}` | `{r['vercel_cache']}` | {badge} |"
        )

    avg_latency = round(sum(r["latency_ms"] for r in results) / len(results), 1) if results else 0
    lines.extend([
        f"",
        f"**Average Latency**: `{avg_latency} ms`",
        f"",
        f"> *Generated automatically by Portfolio Uptime Bot*",
    ])

    try:
        with open(summary_path, "a") as f:
            f.write("\n".join(lines) + "\n")
    except Exception as e:
        print(f"[!] Warning: Could not write to GITHUB_STEP_SUMMARY: {e}", file=sys.stderr)


def main():
    print("=" * 60)
    print("🛰️  Portfolio Observability & Uptime Bot")
    print(f"Target: {BASE_URL}")
    print(f"Time:   {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
    print("=" * 60)

    # 1. SSL Check
    ssl_info = check_ssl(TARGET_HOST)
    if ssl_info.get("ok"):
        print(f"[✓] SSL Certificate: Valid ({ssl_info['issuer']}) - {ssl_info['days_left']} days remaining (Expires: {ssl_info['expires_at']})")
    else:
        print(f"[✗] SSL Certificate Error: {ssl_info.get('error')}")

    print("-" * 60)
    print(f"{'Endpoint':<22} {'Status':<10} {'Latency':<12} {'Edge Node':<12} {'Result'}")
    print("-" * 60)

    results = []
    overall_ok = True if ssl_info.get("ok") else False

    for ep in ENDPOINTS:
        res = probe_endpoint(ep)
        results.append(res)
        if not res["ok"]:
            overall_ok = False

        status_disp = f"HTTP {res['status_code']}" if res["status_code"] else "ERR"
        latency_disp = f"{res['latency_ms']}ms"
        result_disp = "PASS" if res["ok"] else f"FAIL: {res['error']}"
        print(f"{res['name']:<22} {status_disp:<10} {latency_disp:<12} {res['vercel_node']:<12} {result_disp}")

    print("=" * 60)
    avg_latency = round(sum(r["latency_ms"] for r in results) / len(results), 1) if results else 0
    print(f"Overall Status: {'HEALTHY (All checks passed)' if overall_ok else 'UNHEALTHY (Incidents detected)'}")
    print(f"Average Edge Latency: {avg_latency}ms")
    print("=" * 60)

    # Webhook alert if failure
    webhook_url = os.getenv("UPTIME_WEBHOOK_URL")
    if webhook_url and not overall_ok:
        failed = [f"{r['name']} ({r['error']})" for r in results if not r["ok"]]
        msg = f"🚨 **Portfolio Outage Alert!**\nThe following endpoints failed:\n" + "\n".join(f"- {f}" for f in failed)
        send_webhook_alert(webhook_url, msg)

    # GitHub Actions Summary
    write_github_summary(ssl_info, results, overall_ok)

    if not overall_ok:
        sys.exit(1)


if __name__ == "__main__":
    main()
