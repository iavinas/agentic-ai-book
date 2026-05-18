(function () {
  'use strict';

  const btn = document.querySelector('.copy-md-btn');
  if (!btn) {
    console.warn('[copy-markdown] No .copy-md-btn found');
    return;
  }

  const rawUrl = btn.dataset.rawUrl;
  if (!rawUrl) {
    console.warn('[copy-markdown] Button missing data-raw-url');
    return;
  }

  btn.addEventListener('click', async function () {
    console.log('[copy-markdown] Fetching:', rawUrl);
    let text;
    try {
      const response = await fetch(rawUrl);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status + ' for ' + rawUrl);
      }
      text = await response.text();
      console.log('[copy-markdown] Fetched', text.length, 'chars');
    } catch (err) {
      console.error('[copy-markdown] Failed to fetch raw markdown:', err);
      alert('Could not load raw markdown. See console for details.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showCopied();
      console.log('[copy-markdown] Copied to clipboard');
    } catch (err) {
      console.warn('[copy-markdown] navigator.clipboard failed, trying fallback:', err);
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const ok = document.execCommand('copy');
        if (ok) {
          showCopied();
          console.log('[copy-markdown] Fallback copy succeeded');
        } else {
          console.error('[copy-markdown] document.execCommand("copy") returned false');
        }
      } catch (e) {
        console.error('[copy-markdown] Clipboard fallback failed:', e);
      }
      document.body.removeChild(textarea);
    }
  });

  function showCopied() {
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 2000);
  }
})();
