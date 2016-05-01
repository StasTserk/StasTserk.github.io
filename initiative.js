var initiativeTracker = angular.module('initiativeTracker', []);

initiativeTracker.controller('InitiativeController', function($scope) {
    $scope.participants = [
        { 'name': 'Participant1', 'mod': 0, 'adv': true, 'roll': false },
        { 'name': 'Participant2', 'mod': 0, 'adv': false, 'roll': true }
    ];

    $scope.remove = function(participant) {
        var index = $scope.participants.indexOf(participant);
        $scope.participants.splice(index, 1);
    }

    $scope.addNew = function() {
        $scope.participants.push(
        { 'name': "Name", 'mod': 0, 'adv': false, 'roll': true });
    }
})

var Tracker = {} || (
    function() {
        function AddParticipant() {
            
        }
    }
)();