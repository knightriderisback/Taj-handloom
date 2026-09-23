(function(){
  if (window.__phaseH) return; window.__phaseH = true;

  // Force square lookbook (photo is 1:1)
  var s = document.createElement('style');
  s.id = 'phase-h-lookbook';
  s.textContent = [
    '.lookbook-wrap{aspect-ratio:1/1!important}',
    '.lookbook-wrap img{width:100%;height:100%;object-fit:cover;display:block}'
  ].join('');
  (document.head||document.documentElement).appendChild(s);

  // Recalibrate dots for square layout
  var positions = [
    { label: 'Heavy Razaai & Mink Blankets', top: '28%', left: '45%' },
    { label: 'Designer Bedsheet', top: '48%', left: '55%' },
    { label: 'Designer Cushions', top: '30%', left: '78%' },
    { label: 'Bolster (Gol Takiya)', top: '42%', left: '68%' },
    { label: 'AC Blanket (Dohar)', top: '70%', left: '38%' },
    { label: 'Cushion Covers', top: '58%', left: '75%' },
    { label: 'Premium Kaaleen', top: '82%', left: '18%' },
    { label: 'Welcome Doormat', top: '90%', left: '50%' }
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
})();
