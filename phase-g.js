(function(){
  if (window.__phaseG) return; window.__phaseG = true;

  // Kill sticky CTA immediately
  (function(){
    var s = document.createElement('style');
    s.textContent = '#taj-sticky-cta{display:none!important;visibility:hidden!important;height:0!important;max-height:0!important;overflow:hidden!important;pointer-events:none!important;opacity:0!important}';
    (document.head||document.documentElement).appendChild(s);
  })();

  function getStatus(){
    try {
      var parts = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function(p){ map[p.type] = p.value; });
      var day = (map.weekday || '').slice(0,3);
      var hour = parseInt(map.hour, 10);
      var minute = parseInt(map.minute, 10);
      var mins = hour * 60 + minute;
      if (day === 'Tue') return { open: false, label: 'Closed today (Tuesday)', color: '#b45309' };
      var openM = 9 * 60;
      var closeM = 21 * 60 + 30;
      if (mins >= openM && mins < closeM) {
        return { open: true, label: 'Open now · until 9:30 PM', color: '#2f6b3a' };
      }
      if (mins < openM) return { open: false, label: 'Opens at 9:00 AM', color: '#b45309' };
      return { open: false, label: 'Closed · opens 9:00 AM', color: '#b45309' };
    } catch(e) {
      return { open: null, label: '9:00 AM – 9:30 PM · Tue closed', color: '#555' };
    }
  }

  function injectBadge(){
    if (document.getElementById('taj-open-badge')) return;
    var st = getStatus();
    var el = document.createElement('div');
    el.id = 'taj-open-badge';
    el.setAttribute('role', 'status');
    el.textContent = (st.open === true ? '● ' : st.open === false ? '○ ' : '') + st.label;
    el.style.cssText = [
      'display:inline-flex','align-items:center','gap:6px',
      'padding:6px 12px','border-radius:999px','font-size:13px','font-weight:600',
      'background:#fff','color:'+st.color,
      'border:1px solid rgba(140,163,126,.45)',
      'box-shadow:0 2px 8px rgba(0,0,0,.06)',
      'margin:8px 0'
    ].join(';');
    var targets = [
      document.querySelector('[class*="trust"]'),
      document.querySelector('header'),
      document.querySelector('h1'),
      document.querySelector('main')
    ];
    var placed = false;
    for (var i=0;i<targets.length;i++){
      var t = targets[i];
      if (!t) continue;
      if (t.tagName === 'H1' && t.parentNode) {
        t.parentNode.insertBefore(el, t.nextSibling);
        placed = true; break;
      }
      if (t !== document.querySelector('main')) {
        t.appendChild(el); placed = true; break;
      }
    }
    if (!placed) document.body.appendChild(el);
  }

  function removeSticky(){
    var bar = document.getElementById('taj-sticky-cta');
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
    document.body.style.paddingBottom = '';
  }

  // BOTH numbers: 9893357864 (original) + 6266599382 (new default WA)
  function restoreBothPhones(){
    var html = [
      '<a href="tel:9893357864" style="color:inherit;font-weight:700;text-decoration:underline">9893357864</a>',
      ' · ',
      '<a href="tel:6266599382" style="color:inherit;font-weight:700;text-decoration:underline">6266599382</a>',
      ' · ',
      '<a href="https://wa.me/916266599382?text=' + encodeURIComponent('Namaste Taj Handloom! Mujhe stock / price poochna tha.') +
        '" target="_blank" rel="noopener" style="color:#25D366;font-weight:700">WhatsApp</a>'
    ].join('');
    var el = document.getElementById('store-phone');
    if (el) el.innerHTML = html;
  }

  function run(){
    removeSticky();
    injectBadge();
    restoreBothPhones();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(run, 400); });
  } else {
    setTimeout(run, 400);
  }
  setTimeout(run, 1200);
  setTimeout(run, 2500);
})();
