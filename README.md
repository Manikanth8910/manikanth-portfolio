# Manikanth Panuganti — Professional Developer Portfolio

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fmani8910.vercel.app&label=portfolio%20status&style=flat-square)](https://mani8910.vercel.app)
[![Uptime & Observability Bot](https://github.com/Manikanth8910/manikanth-portfolio/actions/workflows/uptime-bot.yml/badge.svg)](https://github.com/Manikanth8910/manikanth-portfolio/actions/workflows/uptime-bot.yml)

> An award-winning, high-performance portfolio featuring pro-level animations, interactive physics particle background, magnetic cursor follower, interactive developer CLI terminal, procedural Web Audio synthesizer, 3D tilt cards, and live system telemetry.

---

## ✨ Features & Pro-Level Animations

- **🌌 Interactive Particle Constellation Canvas**: Real-time canvas physics with cursor gravity/repulsion, velocity drift, and distance-weighted connecting lines (60 FPS).
- **🎯 Pro Magnetic Cursor**: Dual-layer spring physics cursor with magnetic expansion, dynamic hover states, and smooth lerping.
- **💻 Interactive Developer CLI Terminal ("Manikanth-OS")**:
  - Run real commands: `whoami`, `skills`, `projects`, `exp`, `edu`, `awards`, `contact`, `hire`, `resume`, `clear`.
  - Quick action suggestion pills for 1-click execution.
  - Global hotkeys: press `` ` `` or `Ctrl+K` / `Cmd+K` anywhere to open.
- **🔊 Procedural Sound Synthesizer (Web Audio API)**: Zero audio file downloads, pure procedural sound generation for tactile sci-fi feedback (hover chirps, mechanical clicks, celebratory success fanfare).
- **🎉 Particle Confetti Celebrations**: Triggered upon copying email, hiring inquiries, or opening resume milestones.
- **🎴 3D Tilt Cards with Spotlight Reflector**: Real-time perspective transformations tracking cursor position on project cards.
- **🔍 Deep Dive Architecture Modals**: Multi-tab interactive breakdown of system architectures, technical innovations, and quantitative results.
- **📈 Animated Metrics & Stat Counters**: 1,500+ students served, 99.8% uptime, <200ms IoT latency, 94% YOLOv11 accuracy.
- **📑 LaTeX & Interactive Resume Viewer**: Dual-mode resume preview with 1-click PDF print and raw `.tex` source copy/download.
- **📬 Interactive Direct Message Transmission**: Client-side contact hub with character counter, instant validation, and copy-to-clipboard actions.

---

## 🚀 Quick Start

### 1. Development Server
```bash
cd portfolio
bun install   # or: npm install
bun run dev   # or: npm run dev
```
The development server will run at `http://localhost:3000`.

### 2. Production Build
```bash
bun run build # or: npm run build
```
Creates an optimized static bundle in `portfolio/dist`.

### 3. Deploy
Easily deploy to **Vercel**, **GitHub Pages**, or **Netlify** with zero configuration:
- **Vercel**: `vercel`
- **Netlify**: `netlify deploy --prod --dir=dist`

---

## 🛠️ Tech Stack
- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Grid/Flexbox, Custom Glassmorphism
- **Animations**: Framer Motion 12, Canvas 2D Physics, Spring Physics
- **Icons**: Lucide React + Custom SVGs
- **Audio**: Web Audio API Procedural Synthesizer
- **Celebration Effects**: Canvas Confetti

---

## 🛰️ Observability & Uptime Monitoring

This portfolio features proactive uptime and latency observability across its edge endpoints:

- **Automated In-Repo Uptime Bot**: Runs every 30 minutes via [GitHub Actions](.github/workflows/uptime-bot.yml), pinging `/`, `/about`, `/projects`, `/contact`, and `/manikanth_panuganti.pdf` with SSL certificate expiration checks and edge latency tracking.
- **Run Health Check Locally**:
  ```bash
  npm run uptime:check
  ```
- **UptimeRobot External Integration**: Automated setup script in [scripts/setup_uptimerobot.py](scripts/setup_uptimerobot.py) and documentation in [UPTIME_MONITORING.md](UPTIME_MONITORING.md).
  ```bash
  export UPTIMEROBOT_API_KEY="your_api_key"
  npm run uptime:setup
  ```

