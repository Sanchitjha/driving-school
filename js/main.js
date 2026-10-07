/* Site behaviour: config bindings, EN/தமிழ் toggle, mobile menu, WhatsApp form, lightbox, reveal-on-scroll. */
(function () {
  'use strict';

  var S = window.SITE || {};
  var doc = document;
  var root = doc.documentElement;
  var LANG_KEY = 'driving-school-lang';
  var lang = 'en';

  root.classList.add('js');

  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function store(key, val) { try { if (val === undefined) { return localStorage.getItem(key); } localStorage.setItem(key, val); } catch (e) { return null; } }
  function isReal(v) { return v && v !== '#'; }
  function pick(en, ta) { return lang === 'ta' && S[ta] ? S[ta] : S[en]; }

  function fill(str) {
    return String(str)
      .replace(/\{brand\}/g, pick('brand', 'brandTa') || '')
      .replace(/\{city\}/g, pick('city', 'cityTa') || '')
      .replace(/\{phone\}/g, S.phone || '')
      .replace(/\{rating\}/g, S.googleRating || '')
      .replace(/\{year\}/g, String(new Date().getFullYear()));
  }

  /* ---------- config bindings (language independent) ---------- */
  function waLink(msg) {
    return 'https://wa.me/' + (S.whatsapp || '') + '?text=' + encodeURIComponent(msg || S.defaultMessage || '');
  }

  function bindLinks() {
    $all('[data-phone]').forEach(function (n) { n.textContent = S.phone; });
    $all('[data-phone2]').forEach(function (n) { n.textContent = S.phone2; });
    $all('[data-email]').forEach(function (n) { n.textContent = S.email; });
    $all('a[data-tel]').forEach(function (a) { a.href = 'tel:' + S.tel; });
    $all('a[data-tel2]').forEach(function (a) { a.href = 'tel:' + S.tel2; });
    $all('a[data-mail]').forEach(function (a) { a.href = 'mailto:' + S.email; });
    $all('a[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa-msg')); });
    $all('a[data-maps]').forEach(function (a) {
      a.href = S.googleUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.mapsQuery || S.address);
    });
    $all('a[data-google]').forEach(function (a) {
      if (S.googleUrl) { a.href = S.googleUrl; a.hidden = false; } else { a.hidden = true; }
    });
    $all('a[data-social]').forEach(function (a) {
      var url = S[a.getAttribute('data-social')];
      if (isReal(url)) { a.href = url; a.hidden = false; } else { a.hidden = true; }
    });
    // hide contact rows whose config value is empty
    $all('[data-show]').forEach(function (n) { n.hidden = !S[n.getAttribute('data-show')]; });
  }

  function addSchema() {
    var data = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: S.brand,
      description: 'Driving school offering 2 and 4 wheeler training, learner licence and RTO services.',
      telephone: [S.tel, S.tel2],
      address: { '@type': 'PostalAddress', streetAddress: S.address, addressLocality: S.city, addressCountry: 'IN' }
    };
    if (S.email) { data.email = S.email; }
    if (S.url) { data.url = S.url; }
    var s = doc.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    doc.head.appendChild(s);
  }

  /* ---------- language toggle ---------- */
  var textNodes = $all('[data-ta]');
  var phNodes = $all('[data-ta-placeholder]');
  var ariaNodes = $all('[data-ta-aria]');

  textNodes.forEach(function (n) { n.setAttribute('data-en', n.textContent.trim()); });
  phNodes.forEach(function (n) { n.setAttribute('data-en-placeholder', n.getAttribute('placeholder') || ''); });
  ariaNodes.forEach(function (n) { n.setAttribute('data-en-aria', n.getAttribute('aria-label') || ''); });

  function setLang(next) {
    lang = next === 'ta' ? 'ta' : 'en';
    var ta = lang === 'ta';
    root.lang = lang;

    textNodes.forEach(function (n) { n.textContent = fill(n.getAttribute(ta ? 'data-ta' : 'data-en')); });
    phNodes.forEach(function (n) {
      n.setAttribute('placeholder', n.getAttribute(ta ? 'data-ta-placeholder' : 'data-en-placeholder'));
    });
    ariaNodes.forEach(function (n) {
      n.setAttribute('aria-label', n.getAttribute(ta ? 'data-ta-aria' : 'data-en-aria'));
    });

    $all('[data-brand]').forEach(function (n) { n.textContent = pick('brand', 'brandTa'); });
    $all('[data-address]').forEach(function (n) { n.textContent = pick('address', 'addressTa'); });
    $all('[data-landmark]').forEach(function (n) { n.textContent = pick('landmark', 'landmarkTa'); });
    $all('[data-hours]').forEach(function (n) { n.textContent = pick('hours', 'hoursTa') || ''; });

    doc.title = ta
      ? S.brandTa + ' — கீழ்க்கட்டளை, ' + S.cityTa
      : S.brand + ' — Driving School in Keelkattalai, ' + S.city;

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
        'Training: ' + f.get('course'),
        'Preferred time: ' + f.get('time')
      ];
      var note = String(f.get('note') || '').trim();
      if (note) { lines.push('Note: ' + note); }

      var url = waLink(lines.join('\n'));
      var w = window.open(url, '_blank');
      if (w) { w.opener = null; } else { window.location.href = url; }
    });
  }

  /* ---------- tips lightbox ---------- */
  var box = doc.getElementById('lightbox');
  if (box && typeof box.showModal === 'function') {
    var boxImg = box.querySelector('img');
    var boxCap = box.querySelector('.lb-cap');
    $all('.tip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        boxImg.src = img.getAttribute('src');
        boxImg.alt = img.alt;
        boxCap.textContent = btn.querySelector('h3').textContent;
        box.showModal();
      });
    });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.lb-close')) { box.close(); } });
  }

  /* ---------- videos: load the YouTube player only on click ---------- */
  $all('a.video[data-yt]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var f = doc.createElement('iframe');
      f.className = 'video-frame';
      f.src = 'https://www.youtube-nocookie.com/embed/' + a.getAttribute('data-yt') + '?autoplay=1&rel=0&playsinline=1';
      f.title = a.getAttribute('aria-label') || 'Video';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      a.replaceWith(f);
    });
  });

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
  bindLinks();
  addSchema();
  setLang(store(LANG_KEY) || S.defaultLang || 'en');
})();
