/* Site behaviour: config bindings, EN/हिंदी toggle, mobile menu, WhatsApp form, reveal-on-scroll. */
(function () {
  'use strict';

  var S = window.SITE || {};
  var doc = document;
  var root = doc.documentElement;
  var LANG_KEY = 'driving-school-lang';

  root.classList.add('js');

  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function store(key, val) { try { if (val === undefined) { return localStorage.getItem(key); } localStorage.setItem(key, val); } catch (e) { return null; } }
  function isReal(v) { return v && v !== '#'; }

  function fill(str) {
    return String(str)
      .replace(/\{brand\}/g, S.brand || '')
      .replace(/\{city\}/g, S.city || '')
      .replace(/\{year\}/g, String(new Date().getFullYear()));
  }

  /* ---------- config bindings ---------- */
  function waLink(msg) {
    return 'https://wa.me/' + (S.whatsapp || '') + '?text=' + encodeURIComponent(msg || S.defaultMessage || '');
  }

  function bindConfig() {
    $all('[data-brand]').forEach(function (n) { n.textContent = S.brand; });
    $all('[data-city]').forEach(function (n) { n.textContent = S.city; });
    $all('[data-phone]').forEach(function (n) { n.textContent = S.phone; });
    $all('[data-email]').forEach(function (n) { n.textContent = S.email; });
    $all('[data-address]').forEach(function (n) { n.textContent = S.address; });
    $all('a[data-tel]').forEach(function (a) { a.href = 'tel:' + S.tel; });
    $all('a[data-mail]').forEach(function (a) { a.href = 'mailto:' + S.email; });
    $all('a[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa-msg')); });
    $all('a[data-maps]').forEach(function (a) {
      a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.mapsQuery || S.address);
    });
    $all('a[data-social]').forEach(function (a) {
      var url = S[a.getAttribute('data-social')];
      if (isReal(url)) { a.href = url; } else { a.hidden = true; }
    });
  }

  function addSchema() {
    var data = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: S.brand,
      description: 'Car driving school offering driving lessons, learner licence and driving licence support.',
      telephone: S.tel,
      email: S.email,
      address: { '@type': 'PostalAddress', streetAddress: S.address, addressLocality: S.city, addressCountry: 'IN' }
    };
    if (S.url) { data.url = S.url; }
    var s = doc.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    doc.head.appendChild(s);
  }

  /* ---------- language toggle ---------- */
  var textNodes = $all('[data-hi]');
  var phNodes = $all('[data-hi-placeholder]');
  var ariaNodes = $all('[data-hi-aria]');

  textNodes.forEach(function (n) { n.setAttribute('data-en', n.textContent.trim()); });
  phNodes.forEach(function (n) { n.setAttribute('data-en-placeholder', n.getAttribute('placeholder') || ''); });
  ariaNodes.forEach(function (n) { n.setAttribute('data-en-aria', n.getAttribute('aria-label') || ''); });

  function setLang(lang) {
    if (lang !== 'hi') { lang = 'en'; }
    var hi = lang === 'hi';
    root.lang = lang;

    textNodes.forEach(function (n) { n.textContent = fill(n.getAttribute(hi ? 'data-hi' : 'data-en')); });
    phNodes.forEach(function (n) {
      n.setAttribute('placeholder', n.getAttribute(hi ? 'data-hi-placeholder' : 'data-en-placeholder'));
    });
    ariaNodes.forEach(function (n) {
      n.setAttribute('aria-label', n.getAttribute(hi ? 'data-hi-aria' : 'data-en-aria'));
    });
    $all('[data-hours]').forEach(function (n) { n.textContent = hi && S.hoursHi ? S.hoursHi : S.hours; });

    doc.title = hi
      ? S.brand + ' — ' + S.city + ' में कार ड्राइविंग स्कूल'
      : S.brand + ' — Car Driving School in ' + S.city;

    $all('.lang-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    store(LANG_KEY, lang);
  }

  $all('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  /* ---------- header: scroll shadow + mobile menu ---------- */
  var header = doc.querySelector('.site-header');
  var burger = doc.querySelector('.burger');

  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    header.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', function () { setMenu(!header.classList.contains('nav-open')); });
  $all('.nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); } });

  /* ---------- enquiry form -> WhatsApp ---------- */
  var form = doc.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var lines = [
        'Hi, I would like to enquire about driving classes.',
        'Name: ' + String(f.get('name') || '').trim(),
        'Course: ' + f.get('course'),
        'Car type: ' + f.get('car'),
        'Preferred time: ' + f.get('time')
      ];
      var note = String(f.get('note') || '').trim();
      if (note) { lines.push('Note: ' + note); }

      var w = window.open(waLink(lines.join('\n')), '_blank');
      if (w) { w.opener = null; } else { window.location.href = waLink(lines.join('\n')); }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = $all('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (n) { io.observe(n); });
  } else {
    reveals.forEach(function (n) { n.classList.add('in'); });
  }

  /* ---------- init ---------- */
  bindConfig();
  addSchema();
  setLang(store(LANG_KEY) || S.defaultLang || 'en');
})();
