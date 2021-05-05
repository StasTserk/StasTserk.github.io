var initiativeTracker = angular.module('initiativeTracker', []);

initiativeTracker.controller('InitiativeController', function($scope) {
    $scope.participants = Tracker.Initiative.LoadParticipants() || [
        { 'name': 'Participant1', 'mod': 0, 'adv': true, 'roll': false },
        { 'name': 'Participant2', 'mod': 0, 'adv': false, 'roll': true }
    ];

    $scope.combatList = [];

    $scope.activePlayer = {};

    $scope.targetPlayer = {};

    $scope.rollInitiative = function() {
        var newModel = Tracker.Initiative.Process($scope.participants);
        newModel = newModel.sort(Tracker.Initiative.Compare);
        Tracker.Initiative.SwitchModes();
        $scope.combatList.length = 0;
        $scope.combatList = $scope.combatList.concat(newModel);
        newModel[0].active = true;
        $scope.activePlayer = newModel[0];
        $scope.targetPlayer = $scope.activePlayer;
        Tracker.Initiative.SaveInitiative(newModel);
    };

    $scope.endCombat = function () {
        Tracker.Initiative.SwitchModes();
    };

    $scope.toggleAdvantage = function (participant) {
        participant.adv = !participant.adv;
    };

    $scope.toggleShouldRoll = function (participant) {
        participant.roll = !participant.roll;
    };

    $scope.remove = function(participant) {
        var index = $scope.participants.indexOf(participant);
        $scope.participants.splice(index, 1);
    };

    $scope.addNew = function() {
        $scope.participants.push(
        { 'name': "Name", 'mod': 0, 'adv': false, 'roll': true });
    };

    $scope.kill = function(guy) {
        if (guy.active) {
            // the combatant just died on their turn somehow
            $scope.nextTurn();
        }
        var index = $scope.combatList.indexOf(guy);
        $scope.combatList.splice(index, 1);
    };

    $scope.saveParticipants = function() {
        Tracker.Initiative.SaveParticipants($scope.participants);
    };

    $scope.loadParticipants = function() {
        var prevParticipants = Tracker.Initiative.LoadParticipants();
        if (prevParticipants !== undefined) {
            $scope.participants.length = 0;
            $scope.participants = $scope.participants.concat(prevParticipants);
        } else {
            window.alert("Failed to load participants... are there supposed to be any?");
        }
    };

    $scope.restoreLastInitiative = function () {
        var storedInit = Tracker.Initiative.LoadInitiative();
        if (storedInit === undefined) {
            window.alert("Sorry, I got nothing... ");
            return;
        }

        $scope.combatList.length = 0;
        $scope.combatList = $scope.combatList.concat(storedInit);
        Tracker.Initiative.SwitchModes();
        $scope.activePlayer = storedInit[0];
        $scope.activePlayer.active = true;
        $scope.targetPlayer = $scope.activePlayer;
    };

    $scope.nextTurn = function () {
        var activePlayerIndex = $scope.combatList.indexOf($scope.activePlayer);
        $scope.combatList[activePlayerIndex].active = false;
        activePlayerIndex ++;
        if (activePlayerIndex == $scope.combatList.length) { // new round starts
            activePlayerIndex = 0;
        }

        $scope.combatList[activePlayerIndex].active = true;
        $scope.activePlayer = $scope.combatList[activePlayerIndex];
    };

    $scope.damage = function (guy, amount) {
        guy.damage += parseInt(amount);
    }
});

//noinspection JSUnusedAssignment
var Tracker = Tracker || {};
Tracker.Initiative = function () {

    /**
     * @return {number}
     */
    function RollInit(modifier, hasAdvantage) {
        var diceRoll = 0;
        var mod = parseInt(modifier);
        if (hasAdvantage) {
            diceRoll = Math.max(
                Math.ceil(Math.random() * 20),
                Math.ceil(Math.random() * 20));
        } else {
            diceRoll = Math.ceil(Math.random() * 20);
        }
        return diceRoll + mod + (mod / 100);
    }

    function ProcessParticipantList(participants) {
        var combatList = [];
        for (var part in participants) {
            var score = 0;
            if (!participants[part].roll) {
                score = participants[part].mod;
            }
            else {
                score = RollInit(participants[part].mod, participants[part].adv);
            }

            combatList.push(
                {
                    'name': participants[part].name,
                    'score': score,
                    'status': '',
                    'active': false,
                    'damage': 0
                }
            );
        }
        console.log(combatList);
        return combatList;
    }

    function ToggleDivs() {
        $("#participantsDiv").toggle(100);
        $("#initiativeDiv").toggle(100);
    }

    function CompareInitiatives(a, b) {
        var numA = parseFloat(a.score);
        var numB = parseFloat(b.score);

        return (numA < numB) ? 1 : (numA > numB) ? -1 : 0;
    }

    function SaveParticipants(participantsList) {
        localStorage.setItem("part",
            JSON.stringify({ items: participantsList }))
    }

    function SaveInitiative(initiativeList) {
        localStorage.setItem("init",
            JSON.stringify({ items: initiativeList}))
    }

    function LoadParticipants() {
        var storedParticipants = localStorage.getItem("part");
        if (storedParticipants === null) {
            return;
        } else {
            return JSON.parse(storedParticipants).items;
        }
    }

    function LoadInitiative() {
        var storedParticipants = localStorage.getItem("init");
        if (storedParticipants === null) {
            return;
        } else {
            return JSON.parse(storedParticipants).items;
        }
    }

    return {
        Process: ProcessParticipantList,
        SwitchModes: ToggleDivs,
        Compare: CompareInitiatives,
        SaveParticipants: SaveParticipants,
        SaveInitiative: SaveInitiative,
        LoadInitiative: LoadInitiative,
        LoadParticipants: LoadParticipants
    };
}();