(function () {
  const $ = id => document.getElementById(id);
  const effH = $('effHours');
  const effM = $('effMinutes');
  const lastH = $('lastHour');
  const lastM = $('lastMinute');
  const result = $('result');
  const btn = $('calcBtn');
  const themeToggle = $('themeToggle');
  const themeIcon = $('themeIcon');

  // Icon paths
  const moonPath = 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z';
  const sunPath = 'M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41';

  // Check saved theme preference
  const saved = localStorage.getItem('theme');

  function setTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update icon
    const pathEl = themeIcon.querySelector('path');
    if (pathEl) {
      pathEl.setAttribute('d', isDark ? sunPath : moonPath);
    }
  }

  // Initialize theme
  setTheme(saved !== 'light');

  // Theme toggle event
  themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
  });

  // Utility functions
  const clamp = (v, min, max) => Math.min(Math.max(Number(v || 0), min), max);
  const pad2 = n => String(n).padStart(2, '0');

  // Auto-determine AM/PM based on office hours (10 AM - 7 PM)
  // Hours 1-9: PM (afternoon/evening)
  // Hours 10, 11, 12: AM (morning)
  const getAutoPeriod = (hour) => {
    return (hour >= 10 || hour === 12) ? 'AM' : 'PM';
  };

  // Convert 12-hour format to 24-hour format
  const to24h = (hour, period) => {
    hour = Number(hour);
    if (period === 'AM') {
      return hour === 12 ? 0 : hour;
    } else {
      return hour === 12 ? 12 : hour + 12;
    }
  };

  // Convert 24-hour format to 12-hour format
  const to12h = (h, m) => {
    const s = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${pad2(h)}:${pad2(m)} ${s}`;
  };

  // Calculate function
  function calculate() {
    // Get effective time (just duration, no AM/PM needed)
    const eH = clamp(effH.value, 0, 12);
    const eM = clamp(effM.value, 0, 59);

    // Get last punch-in time
    const lH12 = clamp(lastH.value, 1, 12);
    const lM = clamp(lastM.value, 0, 59);

    // Validate inputs
    if (!effH.value || !lastH.value) {
      result.textContent = 'Please fill in the hour fields';
      return;
    }

    // Calculate effective minutes
    const effectiveMinutes = eH * 60 + eM;
    const targetMinutes = 480; // 8 hours in minutes

    if (effectiveMinutes >= targetMinutes) {
      result.textContent = 'You\'ve already completed 8 hours! 🎉';
      return;
    }

    // Calculate remaining minutes
    const remainingMinutes = targetMinutes - effectiveMinutes;

    // Auto-determine AM/PM for last punch-in
    const lPeriod = getAutoPeriod(lH12);

    // Convert last punch-in to 24-hour format
    const lH24 = to24h(lH12, lPeriod);

    // Add remaining minutes to last punch-in time
    let finalHour = lH24;
    let finalMinute = lM + remainingMinutes;

    // Handle minute overflow
    finalHour += Math.floor(finalMinute / 60);
    finalMinute %= 60;

    // Handle day overflow (24-hour cycle)
    finalHour %= 24;

    result.textContent = `You will reach 8:00 at: ${to12h(finalHour, finalMinute)}`;
  }

  // Calculate button event
  btn.addEventListener('click', calculate);

  // Add Enter key support for all input fields
  const inputs = [effH, effM, lastH, lastM];
  inputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculate();
      }
    });
  });
})();