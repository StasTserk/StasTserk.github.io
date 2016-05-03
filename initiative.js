var initiativeTracker = angular.module('initiativeTracker', []);

initiativeTracker.controller('InitiativeController', function($scope) {
    $scope.participants = [
        { 'name': 'Participant1', 'mod': 0, 'adv': true, 'roll': false },
        { 'name': 'Participant2', 'mod': 0, 'adv': false, 'roll': true }
    ];

    $scope.combatList = [];

    $scope.rollInitiative = function() {
        var newModel = Tracker.Initiative.Process($scope.participants);
        $scope.combatList.length = 0;
        $scope.combatList = $scope.combatList.concat(newModel);
    }

    $scope.remove = function(participant) {
        var index = $scope.participants.indexOf(participant);
        $scope.participants.splice(index, 1);
    }

    $scope.addNew = function() {
        $scope.participants.push(
        { 'name': "Name", 'mod': 0, 'adv': false, 'roll': true });
    }
})

var Tracker = Tracker || {};
    Tracker.Initiative = (function() {

        function RollInit(modifier, hasAdvantage)
        {
            var diceRoll = 0;
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
            return diceRoll + modifier + (modifier / 100);
        }

        function ProcessParticipantList(participants) {
            var combatList = [];
            console.log(participants);
            for (var part in participants) {
                console.log(participants[part]);
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
        return {
            Process : ProcessParticipantList
        };
    }());