# UptimeRobot Setup Guide

Please refer to the comprehensive monitoring configuration document:
[UPTIME_MONITORING.md](UPTIME_MONITORING.md)

### Quick Monitor Reference

| Monitor Name | URL | Type | Interval | Expected Status |
|---|---|---|---|---|
| `Portfolio - Homepage` | `https://mani8910.vercel.app/` | HTTP(s) | 5 min | 200 OK |
| `Portfolio - About Route` | `https://mani8910.vercel.app/about` | HTTP(s) | 5 min | 200 OK |
| `Portfolio - Projects Route` | `https://mani8910.vercel.app/projects` | HTTP(s) | 5 min | 200 OK |
| `Portfolio - Contact Route` | `https://mani8910.vercel.app/contact` | HTTP(s) | 5 min | 200 OK |
| `Portfolio - Resume PDF` | `https://mani8910.vercel.app/manikanth_panuganti.pdf` | HTTP(s) | 5 min | 200 OK |

- **SSL Monitoring**: Enabled on `Portfolio - Homepage` (Cert issued by Google Trust Services, valid through Jan 29, 2027).
- **Email Alerts**: Configured for downtime and recovery notifications.
- **Backend / Contact API**: Not deployed (Static SPA). See [UPTIME_MONITORING.md](UPTIME_MONITORING.md) for how to configure `/api/health` if a backend is added later.
