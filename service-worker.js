const cache_name = 'cc1';

const FILES_TO_CACHE = [
    'index.php',
    'assets/lib/dropzone.js',
    'assets/Alert.js',
    'assets/CategoriesManager.js',
    'assets/Category.js',
    'assets/File.js',
    'assets/FilesManager.js',
    'assets/Sorter.js',
    'assets/css/basic.css',
    'assets/css/dropzone.css',
    'assets/css/style.css',
    'assets/app.js',
    'https://code.jquery.com/jquery-3.4.0.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
];



self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(caches.open(cache_name).then((cache) => {
        console.log('Precaching page');
        return cache.addAll(FILES_TO_CACHE);
    }));
  
});
  
self.addEventListener('activate', (e) => {
    console.log('[ServiceWorker] Activate');
    caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key !== cache_name) {
                console.log('Removing old cache', key);
                return caches.delete(key);
            }
        }));
    });

});


self.addEventListener('fetch', (e) => {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.open(cache_name).then((cache) => {
            return cache.match(e.request)
                .then((response) => {
                    return response || fetch(e.request);
                });
        })
    );
});