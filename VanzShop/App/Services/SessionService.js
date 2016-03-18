app.factory('sessionService', ['$cookieStore', function ($cookieStore) {
    var me = this;

    me.saveSession = function(key, value)
    {
        $cookieStore.put(key, value);
    }

    me.getSession = function (key) {
        return $cookieStore.get(key);
    }

    me.removeSession = function (key) {
        $cookieStore.remove(key);
    }

    me.updateSesion = function (key, value)
    {
        $cookieStore.remove(key);
        $cookieStore.put(key, value);
    }

    return {
        saveSession: me.saveSession,
        getSession: me.getSession,
        removeSession: me.removeSession,
        updateSession: me.updateSesion
    }
}]);