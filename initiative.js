var initiativeTracker = angular.module('initiativeTracker', []);

initiativeTracker.controller('InitiativeController', function($scope) {
    $scope.participants = [
        { 'name': 'Participant1', 'mod': 0, 'adv': true, 'roll': false },
        { 'name': 'Participant2', 'mod': 0, 'adv': false, 'roll': true }
    ];

    $scope.combatList = [];

    $scope.rollInitiative = function() {
        var newModel = Tracker.Initiative.Process($scope.participants);
        Tracker.Initiative.SwitchModes();
        $scope.combatList.length = 0;
        $scope.combatList = $scope.combatList.concat(newModel);
    };

    $scope.endCombat = function () {
        Tracker.Initiative.SwitchModes();
    }

    $scope.remove = function(participant) {
        var index = $scope.participants.indexOf(participant);
        $scope.participants.splice(index, 1);
    };

    $scope.addNew = function() {
        $scope.participants.push(
        { 'name': "Name", 'mod': 0, 'adv': false, 'roll': true });
    }
});

var Tracker = Tracker || {};
    Tracker.Initiative = (function() {

        function RollInit(modifier, hasAdvantage)
        {
            var diceRoll = 0;
            var mod = parseInt(modifier);
            if (!hasAdvantage)
            {
                diceRoll = Math.ceil(Math.random() * 20);
            }
            else
            {
                diceRoll = Math.max(
                    Math.ceil(Math.random() * 20),
                    Math.ceil(Math.random() * 20));
            }
            return diceRoll + mod + (mod/100);
        }

        function ProcessParticipantList(participants) {
            var combatList = [];
            for (var part in participants) {
                var score = 0;
                if (!participants[part].roll) {
                    score= participants[part].mod;
                }
                else {
                    score = RollInit(participants[part].mod, participants[part].adv);
                }

                combatList.push(
                    {
                        'name': participants[part].name,
                        'score': score,
                        'status': ''
                    }
                );
            }
            console.log(combatList);
            return combatList;
        }

        function ToggleDivs()
        {
            $( "#participantsDiv" ).toggle(100);
            $( "#initiativeDiv" ).toggle(100);
        }

        return {
            Process : ProcessParticipantList,
            SwitchModes : ToggleDivs
        };
    }());