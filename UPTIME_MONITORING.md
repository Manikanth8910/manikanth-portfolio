# UptimeRobot Free Uptime Monitoring Configuration

This document specifies the uptime monitoring configuration for the portfolio website (**[https://mani8910.vercel.app](https://mani8910.vercel.app)**).

> [!IMPORTANT]
> **Status**: These monitors have **not** been automatically created yet because UptimeRobot account credentials / API keys were not provided. Follow the step-by-step manual setup instructions below, or use the optional automated script with your free UptimeRobot API key.

---

## 1. Production Architecture & Endpoint Analysis

| Attribute | Details |
|---|---|
| **Primary Production URL** | `https://mani8910.vercel.app` |
| **Secondary Vercel URL** | `https://portfolio-one-orpin-89.vercel.app` |
| **Hosting Platform** | Vercel Edge Network |
| **Frontend Framework** | Vite + React + TypeScript Single Page Application (SPA) |
| **SSL Certificate** | Google Trust Services (`*.vercel.app`), auto-renewed by Vercel |
| **SSL Valid Until** | January 29, 2027 |
| **Routing Behavior** | SPA with client-side hash navigation and Vercel rewrite (`/(.*) -> /index.html`), returning `HTTP 200 OK` on all valid routes |
| **Backend API / Health** | **None currently deployed**. The site is a static SPA served from edge CDN. |
| **Contact Form** | Client-side handled (`ContactSection.tsx`) with direct `mailto:manikanthpanuganti0@gmail.com` fallback in footer. No external API server. |

---

## 2. Monitor Specifications (5-Minute Free Plan)

All monitors use **HTTP(s)** monitor type with a **5-minute (300s)** check interval (standard free plan limit) and require an expected **HTTP 200 OK** response.

### Monitor 1: Homepage (Production Root)
- **Monitor Name**: `Portfolio - Homepage`
- **URL**: `https://mani8910.vercel.app/`
- **Monitor Type**: `HTTP(s)`
- **Monitoring Interval**: `5 minutes`
- **HTTP Method**: `HEAD` or `GET`
- **Expected Status Code**: `200` (or `2xx`)
- **SSL Certificate Expiration**: **Enable** (Alert at 14 and 7 days before expiry)
- **Alert Contacts**: Primary Email (Alert on Down & Up)

### Monitor 2: About Route
- **Monitor Name**: `Portfolio - About Route`
- **URL**: `https://mani8910.vercel.app/about`
- **Monitor Type**: `HTTP(s)`
- **Monitoring Interval**: `5 minutes`
- **HTTP Method**: `HEAD` or `GET`
- **Expected Status Code**: `200`
- **Purpose**: Verifies that Vercel Edge rewrite serves the application shell properly.

### Monitor 3: Projects Route
- **Monitor Name**: `Portfolio - Projects Route`
- **URL**: `https://mani8910.vercel.app/projects`
- **Monitor Type**: `HTTP(s)`
- **Monitoring Interval**: `5 minutes`
- **HTTP Method**: `HEAD` or `GET`
- **Expected Status Code**: `200`
- **Purpose**: Verifies project catalog route availability.

### Monitor 4: Contact Route
- **Monitor Name**: `Portfolio - Contact Route`
- **URL**: `https://mani8910.vercel.app/contact`
- **Monitor Type**: `HTTP(s)`
- **Monitoring Interval**: `5 minutes`
- **HTTP Method**: `HEAD` or `GET`
- **Expected Status Code**: `200`
- **Purpose**: Verifies contact route availability.

### Monitor 5: Resume Document
- **Monitor Name**: `Portfolio - Resume PDF`
- **URL**: `https://mani8910.vercel.app/manikanth_panuganti.pdf`
- **Monitor Type**: `HTTP(s)`
- **Monitoring Interval**: `5 minutes`
- **HTTP Method**: `HEAD` or `GET`
- **Expected Status Code**: `200`
- **Purpose**: Validates that the static resume asset is delivered cleanly (`application/pdf`) without 404 errors.

---

## 3. False Positive Prevention Rules

To ensure 100% reliable monitoring without false alarms:

1. **No Authenticated Endpoints**:
   - The portfolio has no private or gated routes. Do not configure basic auth or authorization tokens.
2. **Do Not Treat Expected 4xx as Server Outage**:
   - Only monitor confirmed 200 endpoints (`/`, `/about`, `/projects`, `/contact`, `/manikanth_panuganti.pdf`).
   - If an unmapped path (like `/api/random`) is checked, it will return Vercel's rewrite or 404.
3. **Backend Health & Contact Form API Monitoring (When Added)**:
   - When you attach an external backend (e.g., Express server on Render/Railway or a Vercel Serverless Function `/api/contact`):
     - **Do NOT monitor `POST /api/contact` directly** because sending automated POST requests every 5 minutes will send dummy emails or trigger rate-limiting (`HTTP 429 Too Many Requests`), creating false outage alerts.
     - **Create a dedicated health route**: `GET /api/health` returning `{"status": "ok"}` with `HTTP 200 OK`.
     - Configure the monitor for `GET /api/health` with `HTTP 200` expected status.

---

## 4. Setup Instructions (Manual - UptimeRobot Dashboard)

1. Log in to [UptimeRobot Dashboard](https://dashboard.uptimerobot.com/).
2. Click **+ Add New Monitor**.
3. For each of the 5 monitors listed in Section 2:
   - **Monitor Type**: Select `HTTP(s)`.
   - **Friendly Name**: Enter the monitor name (e.g., `Portfolio - Homepage`).
   - **URL (or IP)**: Paste the URL (e.g., `https://mani8910.vercel.app/`).
   - **Monitoring Interval**: Move slider to `5 minutes` (free plan).
   - **Monitor Timeout**: Set to `30 seconds`.
   - **Alert Contacts To Notify**: Check the box next to your email address.
   - Click **Create Monitor**.
4. **SSL Expiration Monitoring**:
   - Click on the `Portfolio - Homepage` monitor.
   - In the monitor settings or under **SSL Certificate Monitoring**, ensure SSL expiration reminders are enabled (notifies at 14 and 7 days prior to expiration).
5. **Alert Configuration Verification**:
   - Go to **My Settings** > **Alert Contacts**.
   - Verify that your email has a green checkmark indicating it is confirmed.
   - Ensure notifications are enabled for both **Down** (downtime) and **Up** (recovery).

---

## 5. Automated Setup via UptimeRobot API (Optional)

If you have an UptimeRobot API key (obtained from **My Settings** > **API Settings** > **Main API Key**):

1. Set your API key in your terminal:
   ```bash
   export UPTIMEROBOT_API_KEY="your_main_api_key_here"
   ```
2. Run the automated configuration script:
   ```bash
   python3 scripts/setup_uptimerobot.py
   ```
This will automatically create all 5 monitors in your UptimeRobot account with 5-minute intervals and email alerts attached.
