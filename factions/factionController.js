var factionController = angular.module('factionController', []);

factionController.controller('FactionController', function($scope) {
    
    $scope.factions = [];

    // UI elements
    $scope.contest = $("#contestModal");
    $scope.newFactionPopup = $('#factionModal');
    $scope.newFactionData = new NewFactionPopupViewmodel();

    $scope.openContestPopup = function () {
        $scope.contest.css('display', 'block');
    }

    $scope.closeContestPopup = function () {
        $scope.contest.css('display', 'none');
    }

    $scope.openNewFactionPopup = function () {
        $scope.newFactionPopup.css('display', 'block');
        $scope.newFactionData.clear();
    }
    
    $scope.closeNewFactionPopup = function () {
        $scope.newFactionPopup.css('display', 'none');
    }
    $scope.acceptNewFactionPopup = function () {
        var faction = $scope.newFactionData.submit();
        $scope.factions.push(faction);
        $scope.closeNewFactionPopup();
    }
})