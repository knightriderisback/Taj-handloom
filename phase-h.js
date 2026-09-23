(function(){
  if (window.__phaseH) return; window.__phaseH = true;

  var s = document.createElement('style');
  s.id = 'phase-h-lookbook';
  s.textContent = [
    '.lookbook-wrap{aspect-ratio:1/1!important;position:relative}',
    '.lookbook-wrap img{width:100%;height:100%;object-fit:cover;display:block}',
    '.lookbook-dot{z-index:3;cursor:pointer}',
    '.lb-bubble{',
    '  position:absolute;z-index:4;pointer-events:none;',
    '  max-width:42%;padding:5px 9px;border-radius:10px;',
    '  background:rgba(20,16,12,.62);color:#fff;',
    '  font-size:11px;font-weight:600;line-height:1.25;',
    '  letter-spacing:.01em;white-space:nowrap;',
    '  backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);',
    '  box-shadow:0 2px 10px rgba(0,0,0,.25);',
    '  opacity:0;transform:translateY(4px);',
    '  transition:opacity .2s ease,transform .2s ease;',
    '}',
    '.lb-bubble.show{opacity:1;transform:translateY(0)}',
    '.lb-bubble.pin{opacity:.92}',
    '#lookbook-popup{display:none!important}'
  ].join('');
  (document.head||document.documentElement).appendChild(s);

  var positions = [
    { label: 'Window Curtains',       top: 14, left: 10 },
    { label: 'Designer Cushions',     top: 33, left: 34 },
    { label: 'Bolster (Gol Takiya)',  top: 40, left: 48 },
    { label: 'Designer Bedsheet',     top: 47, left: 28 },
    { label: 'Heavy Winter Razaai',   top: 52, left: 58 },
    { label: 'AC Blanket (Dohar)',    top: 60, left: 70 },
    { label: 'Shaggy Rugs',           top: 84, left: 20 },
    { label: 'Premium Kaaleen',       top: 78, left: 74 }
  ];

  function placeBubble(dot, label, top, left){
    var b = document.createElement('div');
    b.className = 'lb-bubble';
    b.textContent = label;
    b.setAttribute('data-lb', label);

    var preferAbove = top > 18;
    var preferRight = left < 70;
    var bTop, bLeft, transform;

    if (preferAbove) {
      bTop = (top - 2);
      if (preferRight) {
        bLeft = left + 3;
        transform = 'translate(0,-100%)';
      } else {
        bLeft = left - 3;
        transform = 'translate(-100%,-100%)';
      }
    } else {
      bTop = top + 4;
      if (preferRight) {
        bLeft = left + 3;
        transform = 'translate(0,0)';
      } else {
        bLeft = left - 3;
        transform = 'translate(-100%,0)';
      }
    }
    b.style.top = bTop + '%';
    b.style.left = bLeft + '%';
    b.style.transform = transform;

    var wrap = dot.parentElement;
    if (wrap) wrap.appendChild(b);
    return b;
  }

  function fixDots(){
    var dots = document.querySelectorAll('.lookbook-dot');
    if (!dots.length) return false;

    document.querySelectorAll('.lb-bubble').forEach(function(el){ el.remove(); });

    positions.forEach(function(p, i){
      if (!dots[i]) return;
      var dot = dots[i];
      dot.style.top = p.top + '%';
      dot.style.left = p.left + '%';
      dot.style.display = '';
      dot.setAttribute('aria-label', p.label);
      dot.title = p.label;

      var bubble = placeBubble(dot, p.label, p.top, p.left);

      function show(){
        document.querySelectorAll('.lb-bubble.show').forEach(function(el){
          if (el !== bubble) el.classList.remove('show');
        });
        bubble.classList.add('show');
      }
      function hide(){
        bubble.classList.remove('show');
      }

      dot.onclick = function(e){
        e.preventDefault();
        e.stopPropagation();
        var open = bubble.classList.contains('show');
        document.querySelectorAll('.lb-bubble.show').forEach(function(el){ el.classList.remove('show'); });
        if (!open) bubble.classList.add('show');
        if (typeof showDot === 'function') showDot(p.label);
      };
      dot.onmouseenter = show;
      dot.onmouseleave = hide;
      dot.onfocus = show;
      dot.onblur = hide;
    });

    for (var j = positions.length; j < dots.length; j++) {
      dots[j].style.display = 'none';
    }

    var wrap = document.querySelector('.lookbook-wrap');
    if (wrap && !wrap.__lbClose) {
      wrap.__lbClose = true;
      wrap.addEventListener('click', function(e){
        if (e.target.classList && e.target.classList.contains('lookbook-dot')) return;
        document.querySelectorAll('.lb-bubble.show').forEach(function(el){ el.classList.remove('show'); });
      });
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
