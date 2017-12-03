var originsController = angular.module('originsController', []);

originsController.controller('OriginsController', function($scope) {
    $scope.numEvents = 4;
    $scope.class = "Fighter";
    $scope.race = "Human";
    $scope.background = "Acolyte";
    $scope.chaMod = 0;
    $scope.backstory = {};
    
    $scope.races = [
        "Human",
        "Dwarf",
        "Elf",
        "Half-Elf",
        "Dragonborn",
        "Half-Orc",
        "Gnome",
        "Halfling",
        "Tiefling"
    ];

    $scope.classes = [
        "Barbarian",
        "Bard",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Warlock",
        "Wizard"
    ];

    $scope.backgrounds = [
        "Acolyte",
        "Charlatan",
        "Criminal",
        "Entertainer",
        "Folk Hero",
        "Guild artisan",
        "Hermit",
        "Noble",
        "Outlander",
        "Sage",
        "Sailor",
        "Soldier",
        "Urchin"
    ]

    $scope.rollBackground = function() {
        var bs = new Backstory($scope.race, $scope.class, $scope.background, $scope.chaMod, $scope.numEvents)
        $scope.backstory = bs;
    }
});