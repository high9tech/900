// Caching Logic & Progress Counter for HIGH TECH PS
function log(msg) {
  const consoleBox = document.getElementById('console');
  if (consoleBox) {
    consoleBox.textContent += '\n' + msg;
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }
}

function updateProgress(percent) {
  const pBar = document.getElementById('progress-bar');
  if (pBar) {
    pBar.style.width = percent + '%';
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        log('[Cache] تم تسجيل Service Worker بنجاح.');
      })
      .catch(err => {
        log('[Cache Failure] خطأ في تسجيل التخزين: ' + err);
      });
  });

  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_PROGRESS') {
      const percent = event.data.percent;
      const statusText = document.getElementById('status-text');
      
      updateProgress(percent);
      statusText.innerText = 'جاري الحفظ في الكاش... ' + percent + '%';
      log('[HIGH TECH PS Cache] جاري التنزيل: ' + percent + '%');

      if (percent >= 100) {
        statusText.innerText = 'تم الكاش بنجاح! يمكنك الآن إغلاق الإنترنت.';
        log('[SUCCESS] تم حفظ كافة الملفات أوفلاين بنجاح.');
      }
    }
  });
}