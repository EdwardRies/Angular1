// Angular Controller
(function() {
	var app = angular.module("myModule", []);

	var myController = function($scope, $interval, $log, gitHub) {

		$scope.pageTitle = "Git Hub User Search";
		$scope.repoSortOrder = "-stargazers_count";
		$scope.username = "EdwardRies";

		$scope.countDown = 5;
		$scope.intervalID = null;

		$scope.search = function(username) {
			$log.info("Searching for " + username);
			manageInterval();
			gitHub.GetUser(username)
				.then(onUserComplete, onError);	
		};

		var onUserComplete = function(data) {
			$scope.user = data;
			gitHub.GetRepos(data)
				.then(onUserRepos, onError);
		};

		var onUserRepos = function(data) {
			$scope.repos = data;
		};

		var onError = function(reason) {
			$scope.error = reason;
		};

		function manageInterval() {
			if ($scope.intervalID) {
				$interval.cancel($scope.intervalID);
				$scope.intervalID = null;
			}
		}

		var searchCountDown = function() {
			$scope.countDown -= 1;
			if ($scope.countDown < 1) {
				$scope.search($scope.username);
			}
		}

		var startSearchCountDown = function() {
			$scope.intervalID = $interval(searchCountDown, 1000, $scope.countDown);
		};

		startSearchCountDown();
	};

	app.controller("myController", ["$scope", "$interval", "$log", "gitHub", myController]);
	
}());

