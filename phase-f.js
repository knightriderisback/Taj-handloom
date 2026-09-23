(function(){
  if (window.__phaseF) return; window.__phaseF = true;

  var CSS = [
    '#taj-faq{margin:2rem auto;max-width:720px;padding:0 1rem 2rem}',
    '#taj-faq h2{font-size:1.35rem;margin:0 0 1rem;color:#2c3a2e;text-align:center}',
    '#taj-faq details{background:#fff;border:1px solid rgba(140,163,126,.35);border-radius:12px;margin:0 0 .6rem;padding:.75rem 1rem;box-shadow:0 2px 8px rgba(0,0,0,.04)}',
    '#taj-faq summary{cursor:pointer;font-weight:600;color:#2c3a2e;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:.5rem}',
    '#taj-faq summary::-webkit-details-marker{display:none}',
    '#taj-faq summary::after{content:"+";font-size:1.2rem;color:#8CA37E;font-weight:700}',
    '#taj-faq details[open] summary::after{content:"−"}',
    '#taj-faq details p{margin:.65rem 0 0;color:#444;line-height:1.55;font-size:.95rem}',
    '#taj-map-wrap{margin:1.5rem auto 2.5rem;max-width:900px;padding:0 1rem}',
    '#taj-map-wrap h2{font-size:1.35rem;margin:0 0 .75rem;color:#2c3a2e;text-align:center}',
    '#taj-map-wrap .map-frame{border:0;width:100%;height:280px;border-radius:14px;box-shadow:0 4px 18px rgba(0,0,0,.08);background:#e8efe6}',
    '#taj-map-wrap .map-actions{display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;margin-top:.85rem}',
    '#taj-map-wrap .map-actions a{display:inline-flex;align-items:center;gap:.35rem;padding:.55rem 1rem;border-radius:999px;background:#8CA37E;color:#fff;text-decoration:none;font-weight:600;font-size:.9rem}',
    '#taj-map-wrap .map-actions a.secondary{background:#fff;color:#2c3a2e;border:1px solid rgba(140,163,126,.5)}',
    '@media(min-width:640px){#taj-map-wrap .map-frame{height:340px}}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var faqs = [
    {q:'Store kab open rehta hai?', a:'Hum 9:00 AM se 9:30 PM tak open hain. Mangalwaar (Tuesday) band rehta hai.'},
    {q:'WhatsApp pe order / price pooch sakte hain?', a:'Haan — +91 62665 99382 pe WhatsApp karein. Product photo bhejein, size aur rate jaldi mil jayega.'},
    {q:'Kya home delivery milti hai?', a:'Dalli Rajhara aur nearby areas mein delivery available hai. Distance ke hisaab se charges WhatsApp pe confirm ho jayenge.'},
    {q:'Mattress / quilt customize ho sakta hai?', a:'Haan, size aur thickness customize karwa sakte hain. Store aake dekh sakte hain ya WhatsApp pe requirement bata dein.'},
    {q:'Address kya hai?', a:'Gyanu pump ke paas, Main Road, Ward No. 26, Dalli Rajhara, Chhattisgarh. Maps pe "Taj Handloom Dalli Rajhara" search karein.'}
  ];

  function buildFaq(){
    var sec = document.createElement('section');
    sec.id = 'taj-faq';
    sec.setAttribute('aria-label', 'Frequently asked questions');
    var h = document.createElement('h2');
    h.textContent = 'Common Questions';
    sec.appendChild(h);
    faqs.forEach(function(item){
      var d = document.createElement('details');
      var s = document.createElement('summary');
      s.textContent = item.q;
      var p = document.createElement('p');
      p.textContent = item.a;
      d.appendChild(s);
      d.appendChild(p);
      sec.appendChild(d);
    });
    return sec;
  }

  function buildMap(){
    var sec = document.createElement('section');
    sec.id = 'taj-map-wrap';
    sec.setAttribute('aria-label', 'Store location map');
    var h = document.createElement('h2');
    h.textContent = 'Visit Our Showroom';
    sec.appendChild(h);
    var iframe = document.createElement('iframe');
    iframe.className = 'map-frame';
    iframe.title = 'Taj Handloom Dalli Rajhara location';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    // Generic Google Maps embed for Dalli Rajhara Main Road area
    iframe.src = 'https://maps.google.com/maps?q=Taj+Handloom+Gyanu+pump+Main+road+Dalli+Rajhara+Chhattisgarh&t=&z=16&ie=UTF8&iwloc=&output=embed';
    sec.appendChild(iframe);
    var actions = document.createElement('div');
    actions.className = 'map-actions';
    var dir = document.createElement('a');
    dir.href = 'https://www.google.com/maps/dir/?api=1&destination=Gyanu+pump+Main+road+Ward+26+Dalli+Rajhara+Chhattisgarh';
    dir.target = '_blank';
    dir.rel = 'noopener noreferrer';
    dir.textContent = 'Get Directions';
    var call = document.createElement('a');
    call.href = 'tel:+916266599382';
    call.className = 'secondary';
    call.textContent = 'Call 62665 99382';
    var wa = document.createElement('a');
    wa.href = 'https://wa.me/916266599382?text=' + encodeURIComponent('Namaste! Store location / direction chahiye tha.');
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.className = 'secondary';
    wa.textContent = 'WhatsApp';
    actions.appendChild(dir);
    actions.appendChild(call);
    actions.appendChild(wa);
    sec.appendChild(actions);
    return sec;
  }

  function mount(){
    var faq = buildFaq();
    var map = buildMap();
    // Prefer before footer, else end of body
    var footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(faq, footer);
      footer.parentNode.insertBefore(map, footer);
    } else {
      document.body.appendChild(faq);
      document.body.appendChild(map);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    // Core may still be writing — small delay
    setTimeout(mount, 400);
  }
})();
