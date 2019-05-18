app.factory('CacheService', function($cacheFactory) {
    return $cacheFactory('CacheService');
});

app.factory('dataCacheService', function(CacheService) {
    return {
        getCache: function(key) {
            var data = CacheService.get(key);

            if(data) {
                return data;
            }
            return null;
        },
        setCache: function(key, value) {
            CacheService.put(key, value);
        },
        clearCache: function(key) {
            CacheService.put(key, '');
        }
    };
});