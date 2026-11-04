#!/usr/bin/env python3
"""
Automated UptimeRobot Monitor Setup for Portfolio
Uses UptimeRobot API v2 to create HTTP(s) monitors with 5-minute intervals.
"""

import os
import sys
import json
import urllib.parse
import urllib.request

API_BASE = "https://api.uptimerobot.com/v2"

MONITORS = [
    {
        "friendly_name": "Portfolio - Homepage",
        "url": "https://mani8910.vercel.app/",
        "type": 1,  # HTTP(s)
        "interval": 300,  # 5 minutes (standard free plan)
    },
    {
        "friendly_name": "Portfolio - About Route",
        "url": "https://mani8910.vercel.app/about",
        "type": 1,
        "interval": 300,
    },
    {
        "friendly_name": "Portfolio - Projects Route",
        "url": "https://mani8910.vercel.app/projects",
        "type": 1,
        "interval": 300,
    },
    {
        "friendly_name": "Portfolio - Contact Route",
        "url": "https://mani8910.vercel.app/contact",
        "type": 1,
        "interval": 300,
    },
    {
        "friendly_name": "Portfolio - Resume PDF",
        "url": "https://mani8910.vercel.app/manikanth_panuganti.pdf",
        "type": 1,
        "interval": 300,
    },
]


def post_request(endpoint, data):
    url = f"{API_BASE}/{endpoint}"
    encoded = urllib.parse.urlencode(data).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=encoded,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode("utf-8"))


def main():
    api_key = os.getenv("UPTIMEROBOT_API_KEY")
    if not api_key:
        print("[!] Error: UPTIMEROBOT_API_KEY environment variable is not set.")
        print("Please obtain your Main API Key from https://dashboard.uptimerobot.com/my-settings")
        print("Then run: export UPTIMEROBOT_API_KEY='your_api_key_here' && python3 scripts/setup_uptimerobot.py")
        sys.exit(1)

    print("[*] Connecting to UptimeRobot API...")

    # Fetch alert contacts to attach email alert
    alert_contacts_data = post_request(
        "getAlertContacts", {"api_key": api_key, "format": "json"}
    )
    alert_contact_ids = ""
    if alert_contacts_data.get("stat") == "ok":
        contacts = alert_contacts_data.get("alert_contacts", [])
        if contacts:
            alert_contact_ids = "_".join(
                f"{c['id']}_0_0" for c in contacts if c.get("status") == 2
            )
            print(f"[+] Found {len(contacts)} alert contact(s).")
    else:
        print(f"[!] Warning: Could not fetch alert contacts: {alert_contacts_data}")

    for mon in MONITORS:
        payload = {
            "api_key": api_key,
            "format": "json",
            "type": mon["type"],
            "friendly_name": mon["friendly_name"],
            "url": mon["url"],
            "interval": mon["interval"],
        }
        if alert_contact_ids:
            payload["alert_contacts"] = alert_contact_ids

        result = post_request("newMonitor", payload)
        if result.get("stat") == "ok":
            print(f"[+] Successfully created monitor: {mon['friendly_name']} ({mon['url']})")
        else:
            print(f"[!] Monitor '{mon['friendly_name']}' returned: {result.get('message', result)}")


if __name__ == "__main__":
    main()
