(function(){
  const $ = id => document.getElementById(id);

  // Elements
  const effH = $('effHours');
  const effM = $('effMinutes');
  const lastH = $('lastHour');
  const lastM = $('lastMinute');
  const result = $('result');
  const btn = $('calcBtn');
  const darkToggle = $('darkToggle');

  // ----- Theme (default: dark) with persistence
  const saved = localStorage.getItem('theme'); // 'dark' | 'light' | null
  if (saved) {
    document.body.classList.toggle('dark', saved === 'dark');
    darkToggle.checked = (saved === 'dark');
  } else {
    // default is dark
    document.body.classList.add('dark');
    darkToggle.checked = true;
  }
  darkToggle.addEventListener('change', () => {
    const isDark = darkToggle.checked;
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // ----- Utils
  const clamp = (v, min, max) => Math.min(Math.max(Number(v||0), min), max);
  const pad2 = (n) => String(n).padStart(2,'0');

  // ----- Core Calculation
  function calculate(){
    const eH = clamp(effH.value, 0, 12);
    const eM = clamp(effM.value, 0, 59);
    const lH = clamp(lastH.value, 0, 23);
    const lM = clamp(lastM.value, 0, 59);

    const currentEffective = eH * 60 + eM;
    const target = 8 * 60; // 480 minutes

    if (currentEffective >= target){
      result.textContent = "You’ve already completed 8 hours 🎉";
      return;
    }

    const remaining = target - currentEffective;
    let endHour = lH;
    let endMinute = lM + remaining;

    endHour += Math.floor(endMinute / 60);
    endMinute = endMinute % 60;
    endHour = endHour % 24; // wrap if next day

    result.textContent = `You will reach 8:00 at: ${pad2(endHour)}:${pad2(endMinute)}`;
  }

  btn.addEventListener('click', calculate);
  [effH, effM, lastH, lastM].forEach(i => i.addEventListener('keydown', e => {
    if (e.key === 'Enter') calculate();
  }));
})();