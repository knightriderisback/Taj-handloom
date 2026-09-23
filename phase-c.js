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
  ready(function(){
    if (!document.getElementById('phase-c-css')) {
      var s = document.createElement('style');
      s.id = 'phase-c-css';
      s.textContent = '.product-search-wrap{margin:12px 0 16px;position:relative}.product-search{width:100%;padding:12px 16px 12px 42px;border-radius:12px;border:1px solid rgba(140,163,126,.35);background:rgba(255,255,255,.85);font-size:15px;outline:none;box-sizing:border-box}body.dark .product-search{background:rgba(30,30,30,.85);color:#eee;border-color:rgba(140,163,126,.45)}.product-search:focus{border-color:#8CA37E;box-shadow:0 0 0 3px rgba(140,163,126,.2)}.product-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);opacity:.55;pointer-events:none;font-size:16px}#category-tabs.tabs{position:sticky;top:0;z-index:20;background:linear-gradient(180deg,#FBF6EC 75%,transparent);padding:8px 0 12px;display:flex;gap:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}body.dark #category-tabs.tabs{background:linear-gradient(180deg,#1a1a1a 75%,transparent)}#category-tabs.tabs::-webkit-scrollbar{display:none}.cat-count{opacity:.75;font-weight:500;font-size:11px;margin-left:4px}.quick-filters{display:flex!important;gap:8px;overflow-x:auto;padding:0 16px 12px}';
      document.head.appendChild(s);
    }
    var tabs = document.getElementById('category-tabs');
    if (tabs && !document.getElementById('product-search')) {
      var wrap = document.createElement('div');
      wrap.className = 'product-search-wrap';
      wrap.innerHTML = '<span class="product-search-icon" aria-hidden="true">🔍</span><input type="search" id="product-search" class="product-search" placeholder="Search mattress, curtain, razai..." aria-label="Search products" autocomplete="off" />';
      tabs.parentNode.insertBefore(wrap, tabs);
      document.getElementById('product-search').addEventListener('input', function(){
        window.filterCategory(window._activeCategory || 'All');
      });
    }
    window._activeCategory = window._activeCategory || 'All';
    var products = window.allProducts || [];
    var counts = {};
    products.forEach(function(p){ if(p.Category) counts[p.Category]=(counts[p.Category]||0)+1; });
    var cats = ['All'].concat(Object.keys(counts));
    if (tabs) {
      tabs.innerHTML = cats.map(function(cat){
        var n = cat==='All' ? products.length : (counts[cat]||0);
        var active = (window._activeCategory===cat) ? ' active' : '';
        return '<button type="button" class="cat-btn'+active+'" onclick="filterCategory(\''+cat.replace(/'/g,"\\'")+'\')">'+cat+'<span class="cat-count">('+n+')</span></button>';
      }).join('');
    }
    window.filterCategory = function(cat){
      window._activeCategory = cat;
      document.querySelectorAll('.cat-btn').forEach(function(btn){
        var label = (btn.textContent||'').replace(/\(\d+\)\s*$/,'').trim();
        btn.classList.toggle('active', label === cat);
      });
      var list = cat === 'All' ? (window.allProducts||[]) : (window.allProducts||[]).filter(function(p){ return p.Category === cat; });
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
