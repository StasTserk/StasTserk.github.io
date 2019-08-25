var factionController = angular.module('factionController', []);

factionController.controller('FactionController', function($scope) {
    
    $scope.factions = [ faction1, faction2 ];
    $scope.eventLog = [];

    // ===============================================================
    //         faction contested roll functionality
    $scope.contestPopup = $("#contestModal");
    $scope.contestData = new ContestPopupViewmodel();
    $scope.openContestPopup = function () {
        $scope.contestData.clear();
        $scope.contestPopup.css('display', 'block');

    };

    $scope.closeContestPopup = function () {
        $scope.contestPopup.css('display', 'none');
    };

    $scope.updateAttackerFeatures = function () {
        const newFaction = $scope.factions.find(faction => 
            faction === $scope.contestData.attacker );
        
        if (newFaction) {
            $scope.contestData.attackerFeatures = newFaction.features;
        }
        else {
            $scope.contestData.attackerFeatures = [];
        }
    };

    $scope.updateDefenderFeatures = function() {
        const newFaction = $scope.factions.find(faction => 
            faction === $scope.contestData.defender );
        
        if (newFaction) {
            $scope.contestData.defenderFeatures = newFaction.features;
        }
        else {
            $scope.contestData.defenderFeatures = [];
        }
    };

    $scope.doContest = function() {
        var result = $scope.contestData.doContest();
        console.log(result);
        this.eventLog.push(result);
        $scope.closeContestPopup();
    };

    // ===============================================================
    //          new faction related functionality
    $scope.newFactionPopup = $('#factionModal');
    $scope.newFactionData = new NewFactionPopupViewmodel();
    $scope.openNewFactionPopup = function () {
        $scope.newFactionPopup.css('display', 'block');
        $scope.newFactionData.clear();
        $scope.newFactionData.onAccept = function () {
            var faction = $scope.newFactionData.submit();
            $scope.factions.push(faction);
            $scope.closeNewFactionPopup();
        };
    };
    
    $scope.closeNewFactionPopup = function () {
        $scope.newFactionPopup.css('display', 'none');
    };
    $scope.acceptNewFactionPopup = function () {
        $scope.newFactionData.onAccept();
    };
    /**
     * @param {Faction} f faction to edit
     */
    $scope.editFaction = function(f) {
        const d = $scope.newFactionData;
        const index = $scope.factions.indexOf(f);
        d.name = f.name;
        d.power = f.power;
        d.description = f.description;
        d.problems = f.problems;
        d.features = f.features;

        d.emblemClass = f.emblemClass;
        d.emblemColour = f.emblemColour;
        d.symbolClass = f.symbolClass;
        d.symbolColour = f.symbolColour;

        d.acceptLabel = "Update Faction";
        $scope.newFactionPopup.css('display', 'block');
        d.onAccept = function () {
            $scope.factions[index] = d.submit();
            $scope.newFactionPopup.css('display', 'none');
        }
    };

    
});