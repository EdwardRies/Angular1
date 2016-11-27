// JavaScript Module Revealing Pattern
$(document).ready(function() { 
    myScript.Initialize();
});

var myScript = (function() {

    function initialize() {
		
    }

    return {
        Initialize: initialize
    }
})();

// Angular Module
(function() {
	var app = angular.module("myModule", []);

	var myController = function($scope, $http) {

		$scope.pageTitle = "Git Hub User Search";
		$scope.username = "";

		var onUserComplete = function(response) {
			$scope.user = response.data;			
		};
	
		var onError = function(reason) {
			$scope.error = reason;
		};
		
		$scope.search = function(username) {
			$http.get("https://api.github.com/users/" + username)
			.then(onUserComplete, onError);	
		};
	
	};

	app.controller("myController", ["$scope", "$http", myController]);
	
}());

