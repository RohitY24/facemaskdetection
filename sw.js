//Caching upon application install
self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open('sw-cache').then(function(cache)
			{
				return cache.add('index.html');
				return cache.add('predict.html');
				return cache.add('train.html');
				return cache.add('script.js');
				return cache.add('sketch.js');
				return cache.add('assets/style.css');
			})
	);
});

//network requests
self.addEventListener('fetch', function(event){
	event.respondWith(
		//try to look for cache
		caches.match(event.request).then(function(response){
			//return if cache else fetch again
			return response || fetch(event.request);
		})
	);
});