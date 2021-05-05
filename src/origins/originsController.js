var originsController = angular.module('originsController', []);

originsController.controller('OriginsController', function($scope) {
    $scope.numEvents = 4;
    $scope.class = "Fighter";
    $scope.race = "Human";
    $scope.background = "Acolyte";
    $scope.chaMod = 0;
    $scope.backstory = {};
    
    $scope.races = [
        "Aarakocra",
        "Aasimar",
        "Bugbear",
        "Dragonborn",
        "Dwarf",
        "Elf",
        "Firbolg",
        "Gensai",
        "Gnome",
        "Goblin",
        "Goliath",
        "Half-elf",
        "Halfling",
        "Half-orc",
        "Hobgoblin",
        "Human",
        "Kenku",
        "Kobold",
        "Lizardfolk",
        "Orc",
        "Tabaxi",
        "Tiefling",
        "Tortle",
        "Triton",
        "Yuan-ti"
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