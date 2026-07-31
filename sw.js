// 每次导航都向服务器校验最新版本（ETag 条件请求，未变返回 304），
// 避免用户看到浏览器/CDN 缓存的旧数据。sw.js 本身很少变化。
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request, { cache: 'no-cache' }).catch(() => caches.match(e.request))
    );
  }
});
