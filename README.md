# 🌙 Roza Siyam

**Advanced Ramadan Timings Tracker & Fasting Companion (2026)**

![Version](https://img.shields.io/badge/version-1.0-amber)
![Status](https://img.shields.io/badge/status-active-success)
![PWA](https://img.shields.io/badge/PWA-Optimized-blue)

**Roza Siyam** is a sleek, mobile-first Progressive Web Application (PWA) designed to help Muslims track their fasting schedules during Ramadan 2026. Built with a native-app feel, it features real-time countdowns, full monthly timetables, and dynamic Fiqa adjustments.

🔗 **Live Demo:** [https://gem-labs-pk.github.io/roza-siyam/](https://gem-labs-pk.github.io/roza-siyam/)

---

## 📥 Download App

Experience Roza Siyam natively on your Android device:

[**📱 Download Roza Siyam .APK**](https://github.com/Gem-labs-pk/roza-siyam/releases/download/Roza_Siyam/Roza.Siyam.apk)

---

## 🚀 Features

### ⏱️ Dynamic Smart Dashboard
* **Real-Time Countdown:** Highly responsive, granular timer ticking down to the exact second for "Sehr Ends In" or "Iftar Time In" based on your current fasting state.
* **Fasting Status Badge:** Automatically updates to indicate whether you are currently fasting or waiting for the next fast.
* **City Selector:** Searchable dropdown menu mapped to exact city coordinates for highly localized timings.

### ⚖️ Advanced Fiqa Engine
* **Multiple Schools of Thought:** Toggle instantly between **Hanafi** (Standard) and **Jafiria** timings.
* **Automatic Time Offsets:** Selecting Jafiria automatically adjusts the entire schedule (Sehr ends 10 minutes earlier, Iftar is delayed by 10 minutes).

### 📅 Complete Timetable & Tracking
* **Full Month View:** A scrollable, dynamically highlighted timetable showing dates, Sehr, and Iftar times for the entire month of Ramadan.
* **Day Details Modal:** Tap any day on the timetable to view a dedicated card showing total fasting duration, specific timings, and active Fiqa settings.
* **Remaining Tracker:** Easily see how many Rozas are left in the month.

### 📱 Native "App-Like" Experience
* **PWA Ready:** Installable directly to your home screen via the browser.
* **Fluid UI:** Features bottom tab navigation, glassmorphism effects, slide-up modals, and touch-optimized buttons.
* **Scroll Lock:** Engineered to disable native browser pull-to-refresh features, ensuring it feels exactly like a compiled mobile app.

---

## 🛠️ Tech Stack & Calculation

* **Core:** HTML5, Vanilla JavaScript (ES6+)
* **Styling:** Tailwind CSS (via CDN)
* **PWA:** Web Manifest (`manifest.json`) and Service Worker (`sw.js`).
* **Analytics:** Google Analytics integrated.
* **Calculation Methodology:** Timings are calculated based on the *University of Islamic Sciences, Karachi* (Method 1) via Aladhan API mapping.

---

## ⚙️ Local Development

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/gem-labs-pk/roza-siyam.git](https://github.com/gem-labs-pk/roza-siyam.git)
    ```
2.  **Serve the application:**
    Since the app uses `fetch()` to load the `cities.json` database, it must be run via a local web server.
    * *Using VS Code:* Install the "Live Server" extension and open `index.html`.
    * *Using Python:* Run `python -m http.server 8000` in the directory.

---

## 👥 Authors

* **Saqib Zahid** * **Powered by Gem Labs**

*Ramadan 2026 Edition*
