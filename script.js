(function(){
  const $ = id => document.getElementById(id);
  const effH = $('effHours');
  const effM = $('effMinutes');
  const lastH = $('lastHour');
  const lastM = $('lastMinute');
  const result = $('result');
  const btn = $('calcBtn');
  const themeBtn = $('themeBtn');
  const themeIcon = $('themeIcon');
  const saved = localStorage.getItem('theme');
  const setTheme = (isDark) => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.src = isDark ? 'images/day.png' : 'images/night.png';
  };
  setTheme(saved !== 'light');
  themeBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    setTheme(isDark);
  });
  const clamp = (v,min,max)=>Math.min(Math.max(Number(v||0),min),max);
  const pad2 = n => String(n).padStart(2,'0');
  const to12h = (hour,minute)=>{
    const suffix = hour>=12?'PM':'AM';
    hour = hour%12||12;
    return `${pad2(hour)}:${pad2(minute)} ${suffix}`;
  };
  function calculate(){
    const eH=clamp(effH.value,0,12);
    const eM=clamp(effM.value,0,59);
    const lH=clamp(lastH.value,0,23);
    const lM=clamp(lastM.value,0,59);
    const current=eH*60+eM;
    const target=8*60;
    if(current>=target){
      result.textContent="You’ve already completed 8 hours 🎉";
      return;
    }
    const remaining=target-current;
    let endHour=lH;
    let endMinute=lM+remaining;
    endHour+=Math.floor(endMinute/60);
    endMinute=endMinute%60;
    endHour=endHour%24;
    result.textContent=`You will reach 8:00 at: ${to12h(endHour,endMinute)}`;
  }
  btn.addEventListener('click', calculate);
})();