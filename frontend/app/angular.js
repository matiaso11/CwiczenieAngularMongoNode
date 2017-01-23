angular.module('appUserManager', [])
    .controller('userManagerController', ['$scope', '$http', function($scope, $http) {
        $scope.newUser = {
            name: null,
            age: null,
            phoneNumber: null
        };
        $scope.usersTable = [];
        $scope.getUsers = function($http, callback) {
            $http.get('http://127.0.0.1:8081/UserManager/getUsers')
                .then(function(response) {
                    callback(response);
                });
        };
        $scope.addUser = function() {
            var urlAddUser = 'http://127.0.0.1:8081/UserManager/addUser' + '?name=' + $scope.newUser.name + '&age=' + $scope.newUser.age + '&phoneNumber=' + $scope.newUser.phoneNumber;
            console.log(urlAddUser);
            $http.get(urlAddUser)
                .then(function(response) {
                    $scope.getUsers($http, function(response) {
                        console.log(response);
                        $scope.usersTable = response.data;
                        console.log($scope.usersTable);
                        $scope.newUser = {
                            name: null,
                            age: null,
                            phoneNumber: null
                        };
                    });
                });
        };
        $scope.removeUser = function(x) {
            var urlAddUser = 'http://127.0.0.1:8081/UserManager/removeUser' + '?name=' + x.name + '&age=' + x.age + '&phoneNumber=' + x.phoneNumber;
            console.log(urlAddUser);
            $http.get(urlAddUser)
                .then(function(response) {
                    $scope.getUsers($http, function(response) {
                        console.log(response);
                        $scope.usersTable = response.data;
                        console.log($scope.usersTable);
                    });
                });
        };
        $scope.getUsers($http, function(response) {
            console.log(response);
            $scope.usersTable = response.data;
            console.log($scope.usersTable);
        });
    }])
    .directive('usersTable', function() {
        return {
            templateUrl: './app/usersTable.html'
        };
    });
