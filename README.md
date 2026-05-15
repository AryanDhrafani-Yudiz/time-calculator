# 8-Hour Time Calculator

A simple, elegant web application to calculate when you'll complete your work shift based on your current effective hours and last punch-in time. Supports full day and half-day shifts.

## Features

- Calculate shift completion time for full day and half-day shifts
- Three shift types: Full Day, First Half, and Second Half
- Auto-detects AM/PM from punch-in hour based on office hours (10 AM – 7 PM)
- Shows remaining time alongside the estimated completion time
- Dark/Light theme toggle with persistent preference
- Responsive design for mobile and desktop
- Clean, modern UI with smooth transitions
- Inline SVG icons (no external dependencies)
- **Animated aurora background** with drifting gradient orbs and twinkling stars
- **Glassmorphism card design** with frosted-glass effect and layered depth
- **Monospace number display** using JetBrains Mono for precision readability

## Files

- `index.html` - Main HTML structure (self-contained; includes CSS and JS inline)
- `README.md` - This file

## Shift Types

| Shift        | Window         | Target   |
|--------------|----------------|----------|
| Full Day     | 10 AM – 7 PM   | 8 hours  |
| First Half   | 10 AM – 2 PM   | 4 hours  |
| Second Half  | 3 PM – 7 PM    | 4 hours  |

## Usage

1. Select your shift type (Full Day / First Half / Second Half)
2. Enter your current effective hours and minutes worked so far
3. Enter your last punch-in time (1–12 hour format; AM/PM is auto-detected)
4. Click **Calculate Shift End** (or press Enter) to see your estimated shift completion time

### AM/PM Auto-Detection Logic

Since the office window is 10 AM – 7 PM, the app automatically determines the period:

- Hours **10** and **11** → **AM** (morning)
- Hours **12** and **1–9** → **PM** (noon onward)

No manual AM/PM input is needed.

## Fixed Issues

✅ Replaced external icon files with inline SVG icons  
✅ Fixed character encoding issues  
✅ Improved theme toggle functionality  
✅ Added proper localStorage support for theme persistence  
✅ Enhanced responsive design  
✅ **Fixed AM/PM auto-detection bug** — noon (12) was incorrectly mapped to AM (midnight), causing wrong completion times  
✅ **Added shift type selector** — Full Day, First Half (10 AM–2 PM), Second Half (3 PM–7 PM)  
✅ **Added remaining time display** alongside the completion time  
✅ Replaced deprecated `keypress` with `keydown` for Enter key support  
✅ Auto-recalculates when shift type is changed (if fields are already filled)

## UI Enhancements

✅ **Animated aurora background** — four slow-drifting radial gradient orbs (sky-blue, violet, cyan, pink) with smooth looping motion using pure CSS `@keyframes`  
✅ **Twinkling star field** — 90 randomly positioned stars with staggered pulse animations for a lively night-sky atmosphere  
✅ **Glassmorphism card** — frosted-glass effect via `backdrop-filter: blur(28px)`, a faint inner highlight border, and a deep layered shadow  
✅ **Gradient heading text** — the title uses a cyan-to-lavender CSS gradient clip for a modern luminous look  
✅ **JetBrains Mono font** for all numeric inputs and the result time, giving a satisfying precision-tool feel  
✅ **Outfit display font** for all UI text — clean, geometric, and highly legible  
✅ **Floating card entrance animation** — card slides up and fades in on load using a spring-eased `@keyframes` animation  
✅ **Glowing shift selector** — selected shift card glows with an accent-colored inner shadow  
✅ **Styled result states** — success, error, and info results each have a distinct tinted background and border color  
✅ **Light mode adapted** — aurora orbs reduce opacity in light mode; colors shift to a soft sky-blue palette  

## Browser Support

Works on all modern browsers that support:
- CSS Custom Properties
- CSS `backdrop-filter` (glassmorphism — degrades gracefully in unsupported browsers)
- ES6 JavaScript
- localStorage API

## Installation

Simply open `index.html` in your web browser. No build process or server required!

> **Note:** The app loads two Google Fonts (Outfit + JetBrains Mono) from `fonts.googleapis.com`. An internet connection is required for the fonts to render; the layout remains fully functional with system fallbacks if offline.

---

**Note:** Half-day shifts target 4 hours (240 minutes); full day targets 8 hours (480 minutes).
