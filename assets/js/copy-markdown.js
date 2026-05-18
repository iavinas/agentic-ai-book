(function () {
  'use strict';

  const btn = document.querySelector('.copy-md-btn');
  if (!btn) return;

  const rawUrl = btn.dataset.rawUrl;
  if (!rawUrl) return;

  btn.addEventListener('click', async function () {
    let text;
    try {
      const response = await fetch(rawUrl);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      text = await response.text();
    } catch (err) {
      console.error('Failed to fetch raw markdown:', err);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showCopied();
    } catch (err) {
      // Fallback for non-secure contexts (e.g. local HTTP)
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showCopied();
      } catch (e) {
        console.error('Clipboard fallback failed:', e);
      }
      document.body.removeChild(textarea);
    }
  });

  function showCopied() {
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 2000);
  }
})();
