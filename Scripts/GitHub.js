// Custom Angular Service
(function() {
    
    var gitHub = function($http, $log) {
        var gitHubUsersUrl = "http://api.github.com/users/";

        var getUser = function(username) {
            $log.info("gitHub.getUser(" + username + ")");
            return $http.get(gitHubUsersUrl + username)
                        .then(function(response) { 
                            return response.data;
            });
        };

        var getRepos = function(user) {
            $log.info("gitHub.getRepos -> " + user.repos_url);
            return $http.get(user.repos_url)
                        .then(function(response) {
                            return response.data;
            });
        };

        return {
            GetUser : getUser,
            GetRepos : getRepos
        };
    };

    var module = angular.module("myModule");
    module.factory("gitHub" ,["$http", "$log", gitHub]);
}())