(function(){
  if (window.__phaseE) return; window.__phaseE = true;

  // Residual old phone cleanup (text nodes + href)
  function fixPhones(root){
    try {
      var OLD = /9893357864/g;
      var NEW = '6266599382';
      var links = (root || document).querySelectorAll('a[href*="9893357864"], a[href*="tel:"]');
      for (var i=0;i<links.length;i++){
        var a = links[i];
        var h = a.getAttribute('href') || '';
        if (h.indexOf('9893357864') !== -1) a.setAttribute('href', h.replace(OLD, NEW));
      }
      var wa = (root || document).querySelectorAll('a[href*="wa.me"]');
      for (var j=0;j<wa.length;j++){
        var w = wa[j];
        var wh = w.getAttribute('href') || '';
        if (wh.indexOf('9893357864') !== -1) w.setAttribute('href', wh.replace(OLD, NEW));
      }
    } catch(e){}
  }
  fixPhones(document);

  // Back to top button
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.id = 'taj-back-top';
  btn.innerHTML = '↑';
  btn.style.cssText = [
    'position:fixed','right:16px','bottom:88px','z-index:9998',
    'width:44px','height:44px','border-radius:50%','border:none',
    'background:#8CA37E','color:#fff','font-size:20px','line-height:44px',
    'box-shadow:0 4px 14px rgba(0,0,0,.18)','cursor:pointer',
    'opacity:0','pointer-events:none','transition:opacity .25s,transform .2s',
    'transform:translateY(8px)','-webkit-tap-highlight-color:transparent'
  ].join(';');
  document.body.appendChild(btn);
  btn.addEventListener('click', function(){
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e){ window.scrollTo(0,0); }
  });
  var shown = false;
  function onScroll(){
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y > 420 && !shown) {
      shown = true;
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      btn.style.transform = 'translateY(0)';
    } else if (y <= 420 && shown) {
      shown = false;
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
      btn.style.transform = 'translateY(8px)';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // PWA manifest link if missing
  if (!document.querySelector('link[rel="manifest"]')) {
    var m = document.createElement('link');
    m.rel = 'manifest';
    m.href = '/site.webmanifest';
    document.head.appendChild(m);
  }
  // Apple mobile web app
  if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
    var a1 = document.createElement('meta');
    a1.name = 'apple-mobile-web-app-capable';
    a1.content = 'yes';
    document.head.appendChild(a1);
  }
  if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
    var a2 = document.createElement('meta');
    a2.name = 'apple-mobile-web-app-status-bar-style';
    a2.content = 'default';
    document.head.appendChild(a2);
  }

  // Tap-to-copy phone feedback on tel links
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!a) return;
    try {
      var num = (a.getAttribute('href')||'').replace(/^tel:/,'').trim();
      if (navigator.clipboard && num) navigator.clipboard.writeText(num).catch(function(){});
    } catch(err){}
  }, true);
})();
