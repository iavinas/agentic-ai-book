/**
 * Persist web-highlighter marks in localStorage (per pathname).
 * Restores after KaTeX + Mermaid (`book:content-ready`) and on window.load.
 *
 * Removing: Alt-click a highlight, or use the compact corner control to clear the page.
 */
(function () {
  var STORAGE_KEY = 'agenticAiBook.readerHighlights.v1';
  var DEBOUNCE_MS = 85;

  function readBag() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (_e) {
      return {};
    }
  }

  function writeBag(bag) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bag));
    } catch (_e5) {}
  }

  function pagePath() {
    return window.location.pathname || '/';
  }

  function serializeSource(hs) {
    return {
      id: hs.id,
      text: hs.text,
      startMeta: hs.startMeta,
      endMeta: hs.endMeta,
      extra: typeof hs.extra === 'undefined' ? undefined : hs.extra
    };
  }

  function loadPageRows(bag, path) {
    var rows = bag[path];
    return Array.isArray(rows) ? rows.slice() : [];
  }

  function upsertSources(bag, path, sources) {
    var rows = loadPageRows(bag, path);
    sources.forEach(function (hs) {
      var s = serializeSource(hs);
      rows = rows.filter(function (r) {
        return r.id !== s.id;
      });
      rows.push(s);
    });
    bag[path] = rows;
  }

  function removeIdsFromBag(bag, path, ids) {
    var set = {};
    ids.forEach(function (id) {
      set[id] = true;
    });
    bag[path] = loadPageRows(bag, path).filter(function (r) {
      return !set[r.id];
    });
    if (!bag[path].length) delete bag[path];
  }

  function bindHighlightFab(onClearPage) {
    if (document.getElementById('reader-highlight-ui')) return;

    var wrap = document.createElement('div');
    wrap.id = 'reader-highlight-ui';
    wrap.setAttribute('aria-label', 'Highlight tools');
    wrap.innerHTML =
      '<div id="reader-highlight-popover" class="reader-highlight-popover" role="dialog" aria-hidden="true" hidden>' +
      '  <button type="button" id="reader-highlight-clear" class="reader-highlight-clear-btn">Clear page highlights</button>' +
      '  <p class="reader-highlight-micro">Alt+click a mark to remove one. Saved only in this browser.</p>' +
      '</div>' +
      '<button type="button" id="reader-highlight-fab" class="reader-highlight-fab" aria-haspopup="dialog" aria-expanded="false" title="Highlights: select text to save. Alt+click a mark to remove. Open for clear.">' +
      '  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '    <path fill="currentColor" d="M15.5 4l4.5 4.5-9.2 9.2-3.5.7.7-3.5L15.5 4zm0 2.1L8.3 13.3l-.3 1.5 1.5-.3 7.2-7.2-1.3-1.3zM5 20h14v2H5v-2z"/>' +
      '  </svg>' +
      '</button>';

    document.body.appendChild(wrap);

    var pop = wrap.querySelector('#reader-highlight-popover');
    var fab = wrap.querySelector('#reader-highlight-fab');
    var clearBtn = wrap.querySelector('#reader-highlight-clear');

    function setOpen(open) {
      pop.hidden = !open;
      pop.setAttribute('aria-hidden', open ? 'false' : 'true');
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function isInsideUi(t) {
      return wrap === t || wrap.contains(t);
    }

    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(pop.hidden);
    });

    clearBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (typeof window.confirm === 'function' && !window.confirm('Remove every highlight on this page from this browser?')) return;
      setOpen(false);
      onClearPage();
    });

    document.addEventListener('click', function (e) {
      if (!isInsideUi(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function bootHighlighter() {
    var root = document.querySelector('main.page-content');
    if (!root || typeof Highlighter === 'undefined') return;

    var highlighter = new Highlighter({
      $root: root,
      exceptSelectors: [
        'pre',
        'code',
        'script',
        'style',
        'textarea',
        'tt',
        '.katex',
        '.katex-display',
        '.katex-html',
        '.mermaid',
        '.chapter-footer',
        'figcaption',
        '#reader-highlight-ui'
      ],
      style: { className: 'reader-highlight-wrap' },
      verbose: false
    });

    var state = {
      suppressRemovePersist: false,
      repaintTimer: null,
      ran: false
    };

    highlighter.on(Highlighter.event.REMOVE, function (data) {
      if (state.suppressRemovePersist || !data || !data.ids || !data.ids.length) return;
      var bag = readBag();
      removeIdsFromBag(bag, pagePath(), data.ids);
      writeBag(bag);
    });

    highlighter.on(Highlighter.event.CREATE, function (data) {
      if (!data || data.type === 'from-store' || !data.sources || !data.sources.length) return;
      var bag = readBag();
      upsertSources(bag, pagePath(), data.sources);
      writeBag(bag);
    });

    highlighter.on(Highlighter.event.CLICK, function (highlightData, _h, ev) {
      if (!highlightData || !highlightData.id) return;
      var mod = !!(ev && ev.altKey);
      if (!mod) return;
      if (typeof window.confirm === 'function' && !window.confirm('Remove this highlight?')) return;

      try {
        highlighter.remove(highlightData.id);
      } catch (_e) {}
      /* REMOVE listener updates localStorage */
    });

    function clearEverythingOnPage() {
      state.suppressRemovePersist = true;
      try {
        highlighter.removeAll();
      } catch (_e) {}
      state.suppressRemovePersist = false;

      var bag = readBag();
      delete bag[pagePath()];
      writeBag(bag);
    }

    function repaintFromStorage() {
      var bag = readBag();
      var rows = loadPageRows(bag, pagePath());

      state.suppressRemovePersist = true;
      try {
        highlighter.removeAll();
      } catch (_e2) {}
      state.suppressRemovePersist = false;

      rows.forEach(function (row) {
        try {
          highlighter.fromStore(row.startMeta, row.endMeta, row.text, row.id, row.extra);
        } catch (_e3) {}
      });
    }

    function scheduleRestore() {
      if (state.repaintTimer !== null) window.clearTimeout(state.repaintTimer);
      state.repaintTimer = window.setTimeout(function () {
        state.repaintTimer = null;
        repaintFromStorage();
        if (!state.ran) {
          try {
            highlighter.run();
          } catch (_e4) {}
          state.ran = true;
        }
      }, DEBOUNCE_MS);
    }

    bindHighlightFab(clearEverythingOnPage);

    window.addEventListener('book:content-ready', scheduleRestore);
    window.addEventListener('load', scheduleRestore);
    scheduleRestore();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootHighlighter);
    } else {
      bootHighlighter();
    }
  }
})();
