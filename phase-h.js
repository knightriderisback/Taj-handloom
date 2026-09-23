(function(){
  if (window.__phaseH) return; window.__phaseH = true;

  // Photo is 1:1 square — force correct box
  var s = document.createElement('style');
  s.id = 'phase-h-lookbook';
  s.textContent = [
    '.lookbook-wrap{aspect-ratio:1/1!important}',
    '.lookbook-wrap img{width:100%;height:100%;object-fit:cover;display:block}'
  ].join('');
  (document.head||document.documentElement).appendChild(s);

  // Dots mapped to the actual bedroom lookbook photo
  var positions = [
    { label: 'Window Curtains', top: '16%', left: '11%' },
    { label: 'Designer Cushions', top: '35%', left: '36%' },
    { label: 'Bolster (Gol Takiya)', top: '41%', left: '44%' },
    { label: 'Designer Bedsheet', top: '46%', left: '32%' },
    { label: 'Heavy Winter Razaai', top: '50%', left: '55%' },
    { label: 'AC Blanket (Dohar)', top: '57%', left: '65%' },
    { label: 'Shaggy Rugs', top: '82%', left: '22%' },
    { label: 'Premium Kaaleen', top: '76%', left: '72%' }
  ];

  function fixDots(){
    var dots = document.querySelectorAll('.lookbook-dot');
    if (!dots.length) return false;
    positions.forEach(function(p, i){
      if (!dots[i]) return;
      dots[i].style.top = p.top;
      dots[i].style.left = p.left;
      dots[i].setAttribute('onclick', "showDot('" + p.label.replace(/'/g, "\\'") + "')");
      dots[i].setAttribute('aria-label', p.label);
      dots[i].title = p.label;
    });
    for (var j = positions.length; j < dots.length; j++) {
      dots[j].style.display = 'none';
    }
    return true;
  }

  function run(){
    if (!fixDots()) setTimeout(run, 400);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(run, 300); });
  } else {
    setTimeout(run, 300);
  }
  setTimeout(run, 1200);
  setTimeout(run, 2500);
})();
