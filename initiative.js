var initiativeTracker = angular.module('initiativeTracker', []);

initiativeTracker.controller('InitiativeController', function($scope) {
    $scope.participants = [
        { 'name': 'Participant1', 'mod': 0, 'advantage': false, roll: false },
        { 'name': 'Participant2', 'mod': 0, 'advantage': false, roll: false }
    ];
})

var Tracker = {} || (
    function() {
        function AddParticipant() {
            
        }
    }
)();