/**
 * One "Copy" control per Rouge fenced block (.highlighter-rouge), top-right.
 * Runs on DOMContentLoaded and book:content-ready (after Mermaid replaces ```mermaid).
 */
(function () {
  'use strict';

  var ATTR = 'data-code-copy-installed';

  function copyText(text, onOk) {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onOk).catch(function () {
        fallbackCopy(text, onOk);
      });
      return;
    }
    fallbackCopy(text, onOk);
  }

  function fallbackCopy(text, onOk) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      if (document.execCommand('copy') && typeof onOk === 'function') onOk();
    } catch (_e) {}
    document.body.removeChild(ta);
  }

  function showCopied(btn) {
    btn.classList.add('copied');
    window.setTimeout(function () {
      btn.classList.remove('copied');
    }, 2000);
  }

  function installOnBlock(wrapper) {
    if (wrapper.getAttribute(ATTR) === 'true') return;
    var code = wrapper.querySelector('pre code');
    if (!code) return;

    wrapper.setAttribute(ATTR, 'true');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.title = 'Copy code';
    btn.innerHTML =
      '<svg class="code-copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>' +
      '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
      '</svg>' +
      '<svg class="code-copy-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      '<polyline points="20 6 9 17 4 12"></polyline>' +
      '</svg>' +
      '<span class="code-copy-label">Copy</span>' +
      '<span class="code-copy-success">Copied!</span>';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var text = code.textContent || '';
      copyText(text, function () {
        showCopied(btn);
      });
    });

    wrapper.insertBefore(btn, wrapper.firstChild);
  }

  function enhance() {
    var root = document.querySelector('main.page-content');
    if (!root) return;
    var blocks = root.querySelectorAll('.highlighter-rouge');
    var i = 0;
    for (; i < blocks.length; i += 1) {
      installOnBlock(blocks[i]);
    }
  }

  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  window.addEventListener('book:content-ready', enhance);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
})();
