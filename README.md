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

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and theme variables
- `script.js` - Calculator logic and theme management
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
4. Click **Calculate** (or press Enter) to see your estimated shift completion time

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

## Browser Support

Works on all modern browsers that support:
- CSS Custom Properties
- ES6 JavaScript
- localStorage API

## Installation

Simply open `index.html` in your web browser. No build process or server required!

---

**Note:** Half-day shifts target 4 hours (240 minutes); full day targets 8 hours (480 minutes).
