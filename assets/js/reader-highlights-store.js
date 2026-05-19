/**
 * Persist web-highlighter marks in localStorage (per pathname).
 * Restores after KaTeX + Mermaid (`book:content-ready`) and on window.load.
 *
 * Prose selections auto-highlight via fromRange(). Selections that touch fenced
 * or inline code show a toolbar: Copy / Highlight / Remove highlight.
 *
 * Removing: Toolbar "Remove highlight", Alt+click a highlight, or corner FAB → clear page.
 */
(function () {
  var STORAGE_KEY = 'agenticAiBook.readerHighlights.v1';
  var DEBOUNCE_MS = 85;
  var TOOLBAR_ID = 'reader-selection-toolbar';

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

  function elementFromNode(node, root) {
    var n = node;
    if (!n) return null;
    if (n.nodeType === 3) n = n.parentElement;
    if (!n || !root.contains(n)) return null;
    return n;
  }

  function containsCodeOrRougeSubtree(el) {
    if (!el || typeof el.closest !== 'function') return false;
    if (el.closest('pre')) return true;
    if (el.closest('code')) return true;
    if (el.closest('.highlighter-rouge')) return true;
    return false;
  }

  /**
   * @returns {'prose'|'codeInvolved'}
   */
  function classifyRange(range, root) {
    var a = elementFromNode(range.startContainer, root);
    var f = elementFromNode(range.endContainer, root);
    if (!a || !f) return 'codeInvolved';
    if (containsCodeOrRougeSubtree(a) || containsCodeOrRougeSubtree(f)) return 'codeInvolved';
    return 'prose';
  }

  function copyTextToClipboard(text, onOk) {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onOk).catch(function () {
        copyTextFallback(text, onOk);
      });
      return;
    }
    copyTextFallback(text, onOk);
  }

  function copyTextFallback(text, onOk) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      if (document.execCommand('copy') && typeof onOk === 'function') onOk();
    } catch (_e) {}
    document.body.removeChild(textarea);
  }

  function ensureSelectionToolbar() {
    var existing = document.getElementById(TOOLBAR_ID);
    if (existing) return existing;

    var bar = document.createElement('div');
    bar.id = TOOLBAR_ID;
    bar.className = 'reader-selection-toolbar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Text selection');
    bar.hidden = true;
    bar.innerHTML =
      '<button type="button" class="reader-selection-btn" data-action="copy">Copy</button>' +
      '<button type="button" class="reader-selection-btn" data-action="highlight">Highlight</button>' +
      '<button type="button" class="reader-selection-btn" data-action="remove">Remove highlight</button>';

    document.body.appendChild(bar);
    return bar;
  }

  function hideSelectionToolbar(bar) {
    bar.hidden = true;
    bar.removeAttribute('data-active');
  }

  function positionSelectionToolbar(bar, rect) {
    bar.hidden = false;
    /* layout for offsetWidth */
    var pad = 6;
    var tw = bar.offsetWidth || 200;
    var th = bar.offsetHeight || 36;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var left = rect.left + rect.width / 2 - tw / 2;
    left = Math.max(8, Math.min(left, vw - tw - 8));
    var top = rect.bottom + pad;
    if (top + th > vh - 8) top = rect.top - th - pad;
    if (top < 8) top = 8;
    bar.style.left = left + 'px';
    bar.style.top = top + 'px';
  }

  function bindHighlightFab(onClearPage) {
    if (document.getElementById('reader-highlight-ui')) return;

    var wrap = document.createElement('div');
    wrap.id = 'reader-highlight-ui';
    wrap.setAttribute('aria-label', 'Highlight tools');
    wrap.innerHTML =
      '<div id="reader-highlight-popover" class="reader-highlight-popover" role="dialog" aria-hidden="true" hidden>' +
      '  <button type="button" id="reader-highlight-clear" class="reader-highlight-clear-btn">Clear page highlights</button>' +
      '  <p class="reader-highlight-micro">Prose: select text to save a highlight. Code: use the selection toolbar to copy or highlight. Alt+click a mark to remove one. Saved only in this browser.</p>' +
      '</div>' +
      '<button type="button" id="reader-highlight-fab" class="reader-highlight-fab" aria-haspopup="dialog" aria-expanded="false" title="Highlights: prose auto-saves on select. Code: use the selection toolbar. Alt+click a mark to remove. Open for clear.">' +
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
        'pre.highlight',
        'script',
        'style',
        'textarea',
        'tt',
        '.katex',
        '.katex-display',
        '.katex-html',
        '.mermaid',
        '.highlighter-rouge',
        '.chapter-footer',
        'figcaption',
        '#reader-highlight-ui',
        '#' + TOOLBAR_ID,
        '.code-copy-btn'
      ],
      style: { className: 'reader-highlight-wrap' },
      verbose: false
    });

    var state = {
      suppressRemovePersist: false,
      repaintTimer: null,
      ran: false,
      selectionEndTimer: null,
      selectionUxBound: false,
      activeToolbarRange: null
    };

    var toolbar = ensureSelectionToolbar();

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

    function updateRemoveButtonState(sel) {
      var removeBtn = toolbar.querySelector('[data-action="remove"]');
      if (!removeBtn) return;
      var id = '';
      try {
        id = highlighter.getIdByDom(sel.anchorNode) || highlighter.getIdByDom(sel.focusNode) || '';
      } catch (_e) {}
      removeBtn.disabled = !id;
    }

    function showToolbarForSelection(sel) {
      var range = sel.getRangeAt(0);
      state.activeToolbarRange = range.cloneRange();
      var rect = range.getBoundingClientRect();
      if (!rect.width && !rect.height) {
        hideSelectionToolbar(toolbar);
        return;
      }
      positionSelectionToolbar(toolbar, rect);
      toolbar.setAttribute('data-active', '1');
      updateRemoveButtonState(sel);
    }

    function performToolbarHighlight() {
      var sel = window.getSelection();
      if (!sel || !sel.rangeCount || sel.isCollapsed) return;
      var range = sel.getRangeAt(0);
      if (!root.contains(range.commonAncestorContainer)) return;
      try {
        highlighter.fromRange(range);
      } catch (_e) {
        /* web-highlighter may reject ranges inside excepted DOM (e.g. pure pre/code) */
      }
      hideSelectionToolbar(toolbar);
      state.activeToolbarRange = null;
    }

    function performToolbarRemove() {
      var sel = window.getSelection();
      if (!sel) return;
      var id = '';
      try {
        id = highlighter.getIdByDom(sel.anchorNode) || highlighter.getIdByDom(sel.focusNode) || '';
      } catch (_e2) {}
      if (!id) return;
      if (typeof window.confirm === 'function' && !window.confirm('Remove this highlight?')) return;
      try {
        highlighter.remove(id);
      } catch (_e3) {}
      hideSelectionToolbar(toolbar);
      state.activeToolbarRange = null;
    }

    function performToolbarCopy() {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed) return;
      var text = sel.toString();
      copyTextToClipboard(text, function () {
        hideSelectionToolbar(toolbar);
        state.activeToolbarRange = null;
      });
    }

    toolbar.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest && e.target.closest('[data-action]');
      if (!btn || !toolbar.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();
      var action = btn.getAttribute('data-action');
      if (action === 'copy') performToolbarCopy();
      else if (action === 'highlight') performToolbarHighlight();
      else if (action === 'remove') performToolbarRemove();
    });

    function handleUserSelectionEnd() {
      if (state.selectionEndTimer !== null) {
        window.clearTimeout(state.selectionEndTimer);
        state.selectionEndTimer = null;
      }

      var sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        hideSelectionToolbar(toolbar);
        state.activeToolbarRange = null;
        return;
      }

      var range = sel.getRangeAt(0);
      if (!root.contains(range.commonAncestorContainer)) {
        hideSelectionToolbar(toolbar);
        state.activeToolbarRange = null;
        return;
      }

      var text = sel.toString();
      if (!text.length) {
        hideSelectionToolbar(toolbar);
        state.activeToolbarRange = null;
        return;
      }

      var kind = classifyRange(range, root);
      if (kind === 'prose') {
        hideSelectionToolbar(toolbar);
        state.activeToolbarRange = null;
        try {
          highlighter.fromRange(range);
        } catch (_e4) {}
        return;
      }

      showToolbarForSelection(sel);
    }

    function scheduleHandleSelectionEnd() {
      if (state.selectionEndTimer !== null) window.clearTimeout(state.selectionEndTimer);
      state.selectionEndTimer = window.setTimeout(function () {
        state.selectionEndTimer = null;
        handleUserSelectionEnd();
      }, DEBOUNCE_MS);
    }

    function bindSelectionUx() {
      if (state.selectionUxBound) return;
      state.selectionUxBound = true;

      function onHiddenOrDismiss() {
        hideSelectionToolbar(toolbar);
      }

      document.addEventListener(
        'mousedown',
        function (e) {
          if (toolbar.contains(e.target)) return;
          hideSelectionToolbar(toolbar);
        },
        true
      );

      window.addEventListener('scroll', onHiddenOrDismiss, true);
      window.addEventListener('resize', onHiddenOrDismiss);

      /* Document level: selection can end outside main (e.g. drag into margin). */
      document.addEventListener('mouseup', scheduleHandleSelectionEnd, true);
      document.addEventListener('touchend', scheduleHandleSelectionEnd, true);

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') onHiddenOrDismiss();
      });
    }

    function scheduleRestore() {
      if (state.repaintTimer !== null) window.clearTimeout(state.repaintTimer);
      state.repaintTimer = window.setTimeout(function () {
        state.repaintTimer = null;
        repaintFromStorage();
        bindSelectionUx();
        if (!state.ran) state.ran = true;
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
