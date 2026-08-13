// Service Worker / Cache Management for Offline usage
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker Registered successfully.'))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}
