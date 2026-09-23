(function(){
  if (window.__phaseD) return; window.__phaseD = true;

  var KEY = 'taj_hl_clicks';
  function load(){
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e){ return {}; }
  }
  function save(data){
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e){}
  }
  function bump(name, extra){
    var d = load();
    d[name] = (d[name] || 0) + 1;
    d.last = { event: name, at: new Date().toISOString(), extra: extra || null };
    d.total = (d.total || 0) + 1;
    save(d);
    // Vercel Web Analytics
    try { if (window.va) window.va('event', { name: name, data: extra || {} }); } catch(e){}
    // GA4
    try { if (typeof gtag === 'function') gtag('event', name, extra || {}); } catch(e){}
    // dataLayer
    try { window.dataLayer = window.dataLayer || []; var payload = { event: name }; if (extra) { for (var k in extra) payload[k] = extra[k]; } window.dataLayer.push(payload); } catch(e){}
    // Custom hook for owner
    try { window.dispatchEvent(new CustomEvent('taj-analytics', { detail: { name: name, counts: d, extra: extra } })); } catch(e){}
  }

  function classify(el){
    if (!el || !el.closest) return null;
    var a = el.closest('a[href]');
    if (!a) return null;
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
      var product = '';
      var card = a.closest('.pcard');
      if (card) {
        var t = card.querySelector('.pcard-title');
        product = t ? (t.textContent || '').trim() : '';
      }
      if (a.classList.contains('pcard-wa') || product) return { name: 'wa_product_click', extra: { product: product || 'unknown' } };
      if (a.classList.contains('dock-wa')) return { name: 'wa_dock_click', extra: {} };
      return { name: 'wa_click', extra: {} };
    }
    if (href.indexOf('tel:') === 0) {
      return { name: 'call_click', extra: {} };
    }
    return null;
  }

  document.addEventListener('click', function(e){
    var info = classify(e.target);
    if (info) bump(info.name, info.extra);
  }, true);

  // Track product search usage (once per session when used)
  document.addEventListener('input', function(e){
    if (e.target && e.target.id === 'product-search' && e.target.value.trim().length >= 2) {
      if (!window.__searchTracked) {
        window.__searchTracked = true;
        bump('product_search', { q: e.target.value.trim().slice(0, 40) });
      }
    }
  }, true);

  // Expose read-only stats for owner (console: tajStats())
  window.tajStats = function(){
    var d = load();
    console.log('%c Taj Handloom click stats ', 'background:#8CA37E;color:#fff;padding:4px 8px;border-radius:6px');
    console.table(d);
    return d;
  };
})();
