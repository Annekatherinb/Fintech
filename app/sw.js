const C='ptg-v4',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
// Red primero (para ver tus cambios); videos nunca se guardan en caché
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
  if(e.request.method!=='GET'||/\.(mp4|webm|mov)$/i.test(u.pathname)||e.request.headers.has('range'))return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
