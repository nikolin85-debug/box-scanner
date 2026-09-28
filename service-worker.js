const CACHE_NAME="boxscanner-v1";

const files=[
 "./",
 "./index.html",
 "./app.js",
 "./styles.css",
 "./manifest.json"
];

self.addEventListener("install",e=>{
 e.waitUntil(
  caches.open(CACHE_NAME)
   .then(cache=>cache.addAll(files))
 );
});

self.addEventListener("fetch",e=>{
 e.respondWith(
  caches.match(e.request)
   .then(resp=>resp || fetch(e.request))
 );
});
