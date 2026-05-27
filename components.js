(function () {
  var lang = localStorage.getItem('tcb-lang') || 'en';

  function t(key) {
    var d = window.TCB_LANG && window.TCB_LANG[lang];
    return (d && d[key] !== undefined) ? d[key] : key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      el.innerHTML = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
      var tmp = document.createElement('textarea');
      tmp.innerHTML = t(el.dataset.i18nPh);
      el.placeholder = tmp.value;
    });
    var sel = document.getElementById('area-select');
    if (sel) {
      var opts = t('contact.f.options');
      if (Array.isArray(opts)) {
        sel.innerHTML = '<option value="" disabled selected>' + t('contact.f.area.d') + '</option>'
          + opts.map(function(o){ return '<option>' + o + '</option>'; }).join('');
      }
    }
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  }

  window.TCB = {
    setLang: function(l) {
      lang = l;
      localStorage.setItem('tcb-lang', l);
      applyTranslations();
    }
  };

  var page = window.location.pathname.split('/').pop() || 'index.html';

  function link(href, key) {
    var cls = page === href ? ' class="active"' : '';
    return '<li><a href="' + href + '"' + cls + ' data-i18n="' + key + '">' + t(key) + '</a></li>';
  }

  function langToggle(extraClass) {
    var c = extraClass || '';
    return '<div class="lang-switch' + (c ? ' ' + c : '') + '">'
      + '<button class="lang-btn' + (lang === 'en' ? ' active' : '') + '" data-lang="en" onclick="TCB.setLang(\'en\')">EN</button>'
      + '<span class="lang-dot">&middot;</span>'
      + '<button class="lang-btn' + (lang === 'fr' ? ' active' : '') + '" data-lang="fr" onclick="TCB.setLang(\'fr\')">FR</button>'
      + '</div>';
  }

  var navHTML = '<nav class="nav">'
    + '<div class="nav-left">'
    + '<a href="index.html" class="nav-logo">TCB Legal</a>'
    + '</div>'
    + '<ul class="nav-links">'
    + link('home.html',    'nav.home')
    + link('about.html',   'nav.firm')
    + link('areas.html',   'nav.areas')
    + link('contact.html', 'nav.contact')
    + '</ul>'
    + '<div class="nav-right">'
    + langToggle()
    + '<button class="nav-hamburger" aria-label="Toggle navigation"><span></span><span></span><span></span></button>'
    + '</div>'
    + '</nav>'
    + '<div class="nav-mobile">'
    + '<a href="home.html"    data-i18n="nav.home">'    + t('nav.home')    + '</a>'
    + '<a href="about.html"   data-i18n="nav.firm">'    + t('nav.firm')    + '</a>'
    + '<a href="areas.html"   data-i18n="nav.areas">'   + t('nav.areas')   + '</a>'
    + '<a href="contact.html" data-i18n="nav.contact">' + t('nav.contact') + '</a>'
    + langToggle('lang-switch--mobile')
    + '</div>';

  var footerHTML = '<footer class="footer">'
    + '<span class="footer-copy" data-i18n="footer.rights">' + t('footer.rights') + '</span>'
    + '<ul class="footer-nav">'
    + '<li><a href="home.html"         data-i18n="nav.home">'     + t('nav.home')     + '</a></li>'
    + '<li><a href="about.html"        data-i18n="nav.firm">'     + t('nav.firm')     + '</a></li>'
    + '<li><a href="areas.html"        data-i18n="nav.areas">'    + t('nav.areas')    + '</a></li>'
    + '<li><a href="contact.html"      data-i18n="nav.contact">'  + t('nav.contact')  + '</a></li>'
    + '<li><a href="legal-notice.html" data-i18n="footer.legal">' + t('footer.legal') + '</a></li>'
    + '</ul>'
    + '</footer>';

  var ns = document.getElementById('site-nav');
  var fs = document.getElementById('site-footer');
  if (ns) ns.outerHTML = navHTML;
  if (fs) fs.outerHTML = footerHTML;

  applyTranslations();

})();
