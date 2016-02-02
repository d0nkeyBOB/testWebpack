(function() {
    'use strict';

    function KinveyService($q) {

        var service = {
            login: login,
            logout: logout,
            save: save,
            get: get
        };

        return service;

        // Function Declarations

        function login(username, password) {

            var deferred = $q.defer();
            if ((username) && (password)) {
				var promise = Kinvey.User.login({
					username : username,
					password : password
				});
				promise.then(function(user) {
					deferred.resolve('Successful Login!');
				}, function(error) {
					deferred.reject('Invalid Username/Password!');
				});

            }else{
                deferred.reject('Username/Password Required!');
            }

            return deferred.promise;

        }

        function logout() {
            var deferred = $q.defer();

            var user = Kinvey.getActiveUser();
            if(null !== user) {
                var logout = Kinvey.User.logout({ force: true });
                logout.then(function(){
                    deferred.resolve('Logged Out!');
                });
            }else {
                deferred.reject('Error Logging Out!');
            }

            return deferred.promise;

        }

        function save(collection, data) {
            var deferred = $q.defer();

            var promise = Kinvey.DataStore.save(collection, data, {
                success: function(response) {
                    deferred.resolve(response);

                },
                error: function (response) {
                    deferred.reject(response);
                }
            });

            return deferred.promise;

        }

        function get(collection, query) {
            var deferred = $q.defer();

            var promise = Kinvey.DataStore.find(collection, query, {
                success: function (response) {
                    deferred.resolve(response);
                },
                error: function (err) {
                    deferred.reject('Query failed!');
                }
            });

            return deferred.promise;

        }
    }
})();
