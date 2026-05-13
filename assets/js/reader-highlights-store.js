/**
 * Persist web-highlighter marks in localStorage (per pathname).
 * Restores after KaTeX + Mermaid (`book:content-ready`) and on window.load.
 *
 * Removing: Alt-click (or Ctrl/Meta-click) the highlight, or clear all via the docked panel.
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

  function bindClearPanel(onClearPage) {
    if (document.getElementById('reader-highlight-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'reader-highlight-panel';
    panel.innerHTML =
      '<button type="button" id="reader-highlight-clear">Clear page highlights</button>' +
      '<p class="reader-highlight-hint">Saved in this browser (localStorage). Alt-click a highlight to remove it.</p>';
    panel.querySelector('#reader-highlight-clear').addEventListener('click', function () {
      if (typeof window.confirm === 'function' && !window.confirm('Remove every highlight on this page from this browser?')) return;
      onClearPage();
    });
    document.body.appendChild(panel);
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
        '#reader-highlight-panel'
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

    bindClearPanel(clearEverythingOnPage);

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
