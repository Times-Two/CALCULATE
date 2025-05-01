self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open("calculator-cache").then((cache) => {
        return cache.addAll([
          "./",
          "./index.html",
          "./style.css",    // Update if your CSS file has a different name
          "./script.js",    // Update if your JS file has a different name
          "./manifest.json",
          "./theo.png",
          "./theo.png"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });
  