(function () {
  const $ = id => document.getElementById(id);
  const effH      = $('effHours');
  const effM      = $('effMinutes');
  const lastH     = $('lastHour');
  const lastM     = $('lastMinute');
  const result    = $('result');
  const btn       = $('calcBtn');
  const themeToggle = $('themeToggle');
  const themeIcon   = $('themeIcon');

  // ── Icon paths ─────────────────────────────────────────────────────────────
  const moonPath = 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z';
  const sunPath  = 'M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41';

  // ── Theme ──────────────────────────────────────────────────────────────────
  function setTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const pathEl = themeIcon.querySelector('path');
    if (pathEl) pathEl.setAttribute('d', isDark ? sunPath : moonPath);
  }

  setTheme(localStorage.getItem('theme') !== 'light');

  themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
  });

  // ── Helpers ────────────────────────────────────────────────────────────────
  const clamp = (v, min, max) => Math.min(Math.max(Number(v || 0), min), max);
  const pad2  = n => String(n).padStart(2, '0');

  /**
   * Auto-detect AM / PM for office punch-in times.
   *
   * Office window: 10 AM – 7 PM
   *   • 8 – 11  → AM  (8:xx AM … 11:xx AM)
   *   • 12      → PM  (12:xx PM = noon, NOT midnight)
   *   • 1 – 7   → PM  (1:xx PM … 7:xx PM)
   */
  const getAutoPeriod = (hour) => (hour >= 8 && hour <= 11) ? 'AM' : 'PM';

  /** 12-h + period  →  24-h integer */
  const to24h = (hour, period) => {
    hour = Number(hour);
    if (period === 'AM') return hour === 12 ? 0  : hour;
    else                 return hour === 12 ? 12 : hour + 12;
  };

  /** 24-h integers  →  "hh:mm AM/PM" */
  const to12h = (h, m) => {
    const s = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${pad2(h)}:${pad2(m)} ${s}`;
  };

  /**
   * Shift configuration
   *
   *  full   → 8 hrs  (10 AM – 7 PM)
   *  first  → 4 hrs  (10 AM – 2 PM)
   *  second → 4 hrs  (3 PM  – 7 PM)
   */
  const getShiftConfig = () => {
    const type = document.querySelector('input[name="shiftType"]:checked').value;
    switch (type) {
      case 'first':
        return { target: 240, label: 'First Half (4 hrs)', isHalfDay: true };
      case 'second':
        return { target: 240, label: 'Second Half (4 hrs)', isHalfDay: true };
      default:
        return { target: 480, label: 'Full Day (8 hrs)', isHalfDay: false };
    }
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const isBlank = v => v === '' || v === null || v === undefined;

  // ── Main calculation ───────────────────────────────────────────────────────
  function calculate() {
    const eH   = clamp(effH.value, 0, 12);
    const eM   = clamp(effM.value, 0, 59);
    const lH12 = clamp(lastH.value, 1, 12);
    const lM   = clamp(lastM.value, 0, 59);

    if (isBlank(effH.value) || isBlank(lastH.value)) {
      result.className = 'error';
      result.textContent = '⚠️  Please fill in at least the hours fields.';
      return;
    }

    const { target, label, isHalfDay } = getShiftConfig();
    const effectiveMinutes = eH * 60 + eM;

    if (effectiveMinutes >= target) {
      result.className = 'success';
      result.textContent = isHalfDay
        ? `🎉  You've already completed your half-day (${label})!`
        : `🎉  You've already completed 8 hours!`;
      return;
    }

    const remainingMinutes = target - effectiveMinutes;

    // Determine whether the punch-in hour is AM or PM automatically
    const lPeriod = getAutoPeriod(lH12);
    const lH24    = to24h(lH12, lPeriod);

    // Add remaining time to last punch-in
    let finalMinute = lM + remainingMinutes;
    let finalHour   = lH24 + Math.floor(finalMinute / 60);
    finalMinute %= 60;
    finalHour   %= 24;   // safety wrap (shouldn't exceed 24 h in normal use)

    const remaining = `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m remaining`;
    result.className = '';
    result.innerHTML =
      `You will complete your shift at: <strong>${to12h(finalHour, finalMinute)}</strong>`
      + `<br><span class="sub">${remaining} · ${label}</span>`;
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  btn.addEventListener('click', calculate);

  [effH, effM, lastH, lastM].forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  // Recalculate automatically when shift type changes (if values are already filled)
  document.querySelectorAll('input[name="shiftType"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (effH.value && lastH.value) calculate();
    });
  });
})();
