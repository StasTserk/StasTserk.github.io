var factionController = angular.module('factionController', []);

factionController.controller('FactionController', function($scope) {
    
    $scope.factions = [ faction1, faction2 ];

    // ===============================================================
    //         faction contested roll functionality
    $scope.contestPopup = $("#contestModal");
    $scope.contestData = new ContestPopupViewmodel();
    $scope.openContestPopup = function () {
        $scope.contestPopup.css('display', 'block');
    }

    $scope.closeContestPopup = function () {
        $scope.contestPopup.css('display', 'none');
    }

    $scope.updateAttackerFeatures = function () {
        const newFaction = $scope.factions.find(faction => 
            faction === $scope.contestData.attacker );
        
        if (newFaction) {
            $scope.contestData.attackerFeatures = newFaction.features;
        }
        else {
            $scope.contestData.attackerFeatures = [];
        }
    }

    $scope.updateDefenderFeatures = function() {
        const newFaction = $scope.factions.find(faction => 
            faction === $scope.contestData.defender );
        
        if (newFaction) {
            $scope.contestData.defenderFeatures = newFaction.features;
        }
        else {
            $scope.contestData.defenderFeatures = [];
        }
    }

    $scope.doContest = function() {
        var result = $scope.contestData.doContest();
        console.log(result);
    }

    // ===============================================================
    //          new faction related functionality
    $scope.newFactionPopup = $('#factionModal');
    $scope.newFactionData = new NewFactionPopupViewmodel();
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