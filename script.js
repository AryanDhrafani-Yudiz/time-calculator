(function(){
  const el = id => document.getElementById(id);
  const effH = el('effHours');
  const effM = el('effMinutes');
  const lastH = el('lastHour');
  const lastM = el('lastMinute');
  const result = el('result');
  const btn = el('calcBtn');
  const themeSwitch = el('themeSwitch');

  function clamp(val, min, max){
    val = Number.isFinite(+val) ? +val : 0;
    return Math.min(Math.max(val, min), max);
  }

  function fmt2(n){ return String(n).padStart(2,'0'); }

  function calculate(){
    const eH = clamp(effH.value, 0, 12);
    const eM = clamp(effM.value, 0, 59);
    const lH = clamp(lastH.value, 0, 23);
    const lM = clamp(lastM.value, 0, 59);

    const currentEffective = eH * 60 + eM;
    const target = 8 * 60;

    if (currentEffective >= target){
      result.textContent = "You’ve already completed 8 hours 🎉";
      return;
    }

    const remaining = target - currentEffective;
    let endHour = lH;
    let endMinute = lM + remaining;

    endHour += Math.floor(endMinute / 60);
    endMinute = endMinute % 60;
    endHour = endHour % 24;

    const formatted = `${fmt2(endHour)}:${fmt2(endMinute)}`;
    result.textContent = `You will reach 8:00 at: ${formatted}`;
  }

  btn.addEventListener('click', calculate);
  [effH, effM, lastH, lastM].forEach(i => i.addEventListener('keydown', e=>{
    if(e.key === 'Enter') calculate();
  }));

  // Dark theme toggle
  themeSwitch.addEventListener('change', ()=>{
    document.body.classList.toggle('dark', themeSwitch.checked);
  });
})();