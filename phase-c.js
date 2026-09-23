(function(){
  if (window.__phaseC) return; window.__phaseC = true;
  function ready(fn){
    var n = 0, t = setInterval(function(){
      n++;
      if (document.getElementById('products-grid') && window.allProducts && window.allProducts.length > 0 && typeof window.renderProducts === 'function') {
        clearInterval(t); fn();
      }
      if (n > 150) clearInterval(t);
    }, 80);
  }
  // Force-hide category chips + sticky CTA ASAP (even before products ready)
  (function earlyHide(){
    var s = document.createElement('style');
    s.id = 'phase-c-css';
    s.textContent = [
      '.product-search-wrap{margin:12px 0 16px;position:relative;padding:0 16px}',
      '.product-search{width:100%;padding:12px 16px 12px 42px;border-radius:12px;border:1px solid rgba(140,163,126,.35);background:rgba(255,255,255,.85);font-size:15px;outline:none;box-sizing:border-box}',
      'body.dark .product-search{background:rgba(30,30,30,.85);color:#eee;border-color:rgba(140,163,126,.45)}',
      '.product-search:focus{border-color:#8CA37E;box-shadow:0 0 0 3px rgba(140,163,126,.2)}',
      '.product-search-icon{position:absolute;left:30px;top:50%;transform:translateY(-50%);opacity:.55;pointer-events:none;font-size:16px}',
      '#category-tabs,.quick-filters{display:none!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important}',
      '#taj-sticky-cta{display:none!important;visibility:hidden!important;height:0!important;pointer-events:none!important}'
    ].join('');
    (document.head || document.documentElement).appendChild(s);
  })();

  ready(function(){
    var tabs = document.getElementById('category-tabs');
    var anchor = tabs || document.getElementById('products-grid');
    if (anchor && !document.getElementById('product-search')) {
      var wrap = document.createElement('div');
      wrap.className = 'product-search-wrap';
      wrap.innerHTML = '<span class="product-search-icon" aria-hidden="true">🔍</span><input type="search" id="product-search" class="product-search" placeholder="Search mattress, curtain, razai..." aria-label="Search products" autocomplete="off" />';
      if (tabs && tabs.parentNode) tabs.parentNode.insertBefore(wrap, tabs);
      else if (anchor.parentNode) anchor.parentNode.insertBefore(wrap, anchor);
      document.getElementById('product-search').addEventListener('input', function(){
        window.filterCategory(window._activeCategory || 'All');
      });
    }
    window._activeCategory = window._activeCategory || 'All';
    window.filterCategory = function(cat){
      window._activeCategory = cat || 'All';
      var list = window._activeCategory === 'All'
        ? (window.allProducts||[])
        : (window.allProducts||[]).filter(function(p){ return p.Category === window._activeCategory; });
      var q = (document.getElementById('product-search')||{}).value || '';
      if (q.trim()) {
        var qq = q.trim().toLowerCase();
        list = list.filter(function(p){
          return ((p.Product_Title||'')+' '+(p.Description||'')+' '+(p.Category||'')).toLowerCase().indexOf(qq) !== -1;
        });
      }
      if (typeof renderProducts === 'function') renderProducts(list);
    };
    function upgradeWaLinks(){
      document.querySelectorAll('a.pcard-wa, a.spotlight-result').forEach(function(a){
        try {
          var href = a.getAttribute('href')||'';
          if (href.indexOf('wa.me') === -1) return;
          var title = '', cat = '';
          var card = a.closest('.pcard');
          if (card) {
            title = (card.querySelector('.pcard-title')||{}).textContent || '';
            cat = (card.querySelector('.pcard-cat')||{}).textContent || '';
          }
          if (!title) {
            var p = a.querySelector('p');
            if (p) title = p.textContent || '';
          }
          var msg = 'Namaste Taj Handloom (Dalli Rajhara)!\n\nProduct: ' + (title||'Product') + '\nCategory: ' + (cat||'') + '\n\nMujhe iska price, size options aur stock status bataiye please.';
          a.setAttribute('href', 'https://wa.me/916266599382?text=' + encodeURIComponent(msg));
          a.setAttribute('rel', 'noopener');
          a.setAttribute('target', '_blank');
        } catch(e){}
      });
    }
    upgradeWaLinks();
    var grid = document.getElementById('products-grid');
    if (grid && window.MutationObserver) {
      new MutationObserver(function(){ upgradeWaLinks(); }).observe(grid, {childList:true, subtree:true});
    }
    window.filterCategory(window._activeCategory);
  });
})();
