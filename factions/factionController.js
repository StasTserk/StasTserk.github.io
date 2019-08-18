var factionController = angular.module('factionController', []);

factionController.controller('FactionController', function($scope) {
    $scope.modal = $("#contestModal");
    $scope.openContestPopup = function () {
        $scope.modal.css('display', 'block');
    }

    $scope.closeContestPopup = function () {
        $scope.modal.css('display', 'none');
    }
})