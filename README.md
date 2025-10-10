# 8-Hour Time Calculator

A simple, elegant web application to calculate when you'll complete 8 hours of work based on your current effective hours and last punch-in time.

## Features

- Calculate completion time for 8-hour workday
- Dark/Light theme toggle with persistent preference
- Responsive design for mobile and desktop
- Clean, modern UI with smooth transitions
- Inline SVG icons (no external dependencies)

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and theme variables
- `script.js` - Calculator logic and theme management
- `README.md` - This file

## Usage

1. Enter your current effective hours and minutes worked
2. Enter your last punch-in time in 24-hour format
3. Click "Calculate" to see when you'll reach 8 hours

## Fixed Issues

✅ Replaced external icon files with inline SVG icons  
✅ Fixed character encoding issues  
✅ Improved theme toggle functionality  
✅ Added proper localStorage support for theme persistence  
✅ Enhanced responsive design

## Browser Support

Works on all modern browsers that support:
- CSS Custom Properties
- ES6 JavaScript
- localStorage API

## Installation

Simply open `index.html` in your web browser. No build process or server required!

---

**Note:** This calculator assumes you're tracking an 8-hour workday (480 minutes total).