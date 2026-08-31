// LORUNEI samples interactions — v1
(() => {
  const root = document.documentElement;
  const validPlans = ['quick', 'answer', 'research', 'private'];
  const titles = { en: 'LORUNEI — Sample Deliverables', ja: 'LORUNEI — 納品サンプル' };

  function normalizeLang(value) { return value === 'ja' ? 'ja' : 'en'; }

  function syncLinks(lang) {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) return;
      if (!/\.html(?:[?#]|$)/i.test(href)) return;
      try {
        const url = new URL(href, location.href);
        url.searchParams.set('lang', lang);
        link.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
      } catch (_) {}
    });
  }

  function setLanguage(value) {
    const lang = normalizeLang(value);
    root.lang = lang;
    document.title = titles[lang];
    try {
      localStorage.setItem('loruneiLang', lang);
      
    } catch (_) {}
    document.querySelectorAll('[data-lang]').forEach(button => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    syncLinks(lang);
  }

  function showSample(value, updateUrl = true) {
    const plan = validPlans.includes(value) ? value : 'quick';
    document.querySelectorAll('[data-sample]').forEach(button => {
      const active = button.dataset.sample === plan;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('[data-sample-panel]').forEach(panel => {
      const active = panel.dataset.samplePanel === plan;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('plan', plan);
      history.replaceState(null, '', url);
    }
  }

  document.addEventListener('click', event => {
    const languageButton = event.target.closest('[data-lang]');
    if (languageButton) setLanguage(languageButton.dataset.lang);
    const sampleButton = event.target.closest('[data-sample]');
    if (sampleButton) showSample(sampleButton.dataset.sample);
  });

  const params = new URLSearchParams(location.search);
  let initialLang = params.get('lang');
  try { initialLang = initialLang || localStorage.getItem('loruneiLang') ; } catch (_) {}
  initialLang = initialLang || ((navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en');
  setLanguage(initialLang);
  showSample(params.get('plan'), false);
})();
