var emColour = 1;
var smColour = 2;
var colourClasses = [
    "em-white",
    "em-black",
    "em-red",
    "em-green",
    "em-blue",
    "em-gold"
];
var emClass = 1;
var emblemClasses = [
    "em-circle",
    "em-shield",
    "em-banner",
    "em-box",
    "em-hex"
];
var smClass = 1;
var symbolClasses = [
    "sm-bolt",
    "sm-mask",
    "sm-eye",
    "sm-skull",
    "sm-sword",
    "sm-book",
    "sm-tree",
    "sm-moon",
    "sm-hand",
    "sm-cup"
];
var NewFactionPopupViewmodel = /** @class */ (function () {
    function NewFactionPopupViewmodel() {
        this.clear();
    }
    NewFactionPopupViewmodel.prototype.open = function () {
        $('#factionModal').css('display', 'block');
    };
    NewFactionPopupViewmodel.prototype.close = function () {
        $('#factionModal').css('display', 'none');
    };
    NewFactionPopupViewmodel.prototype.clear = function () {
        this.name = "";
        this.description = "";
        this.power = 1;
        this.dominion = 0;
        this.features = [];
        this.problems = [];
        this.acceptLabel = "Add faction";
        this.onAccept = function () { };
        this.emblemClass = "em-circle";
        this.emblemColour = "em-black";
        this.symbolClass = "sm-bolt";
        this.symbolColour = "em-white";
        this.interest = [];
        this.enemyInterest = [];
        emColour = 1;
        smColour = 2;
        emClass = 1;
        smClass = 1;
    };
    NewFactionPopupViewmodel.prototype.addFeature = function () {
        this.features.push("");
    };
    NewFactionPopupViewmodel.prototype.addProblem = function () {
        this.problems.push({ name: "", size: 0 });
    };
    NewFactionPopupViewmodel.prototype.cycleEmblem = function () {
        this.emblemClass = emblemClasses[emClass];
        emClass++;
        emClass = emClass % emblemClasses.length;
    };
    NewFactionPopupViewmodel.prototype.cycleEmblemColour = function () {
        this.emblemColour = colourClasses[emColour];
        emColour++;
        emColour = emColour % colourClasses.length;
    };
    NewFactionPopupViewmodel.prototype.cycleSymbol = function () {
        this.symbolClass = symbolClasses[smClass];
        smClass++;
        smClass = smClass % symbolClasses.length;
    };
    NewFactionPopupViewmodel.prototype.cycleSymbolColour = function () {
        this.symbolColour = colourClasses[smColour];
        smColour++;
        smColour = smColour % colourClasses.length;
    };
    NewFactionPopupViewmodel.prototype.submit = function () {
        this.features = this.features.filter(function (feature) { return feature.length > 0; });
        this.problems = this.problems.filter(function (problem) { return problem.text.length > 0 && problem.size > 0; });
        var faction = new Faction();
        faction.power = this.power;
        faction.name = this.name;
        faction.description = this.description;
        faction.cohesion = this.power;
        faction.cohesionMax = this.power;
        faction.dominion = this.dominion;
        faction.emblemColour = this.emblemColour;
        faction.emblemClass = this.emblemClass;
        faction.symbolColour = this.symbolColour;
        faction.symbolClass = this.symbolClass;
        faction.interest = this.interest;
        faction.enemyInterest = this.enemyInterest;
        faction.features = this.features;
        for (var i in this.problems) {
            faction.addProblem(this.problems[i].text, this.problems[i].size);
        }
        console.log(faction);
        return faction;
    };
    return NewFactionPopupViewmodel;
}());
var ContestPopupViewmodel = /** @class */ (function () {
    function ContestPopupViewmodel() {
        this.clear();
        this.attackerFeatures = [];
        this.defenderFeatures = [];
        this.onAccept = function () { };
    }
    ContestPopupViewmodel.prototype.open = function () {
        $("#contestModal").css('display', 'block');
    };
    ContestPopupViewmodel.prototype.close = function () {
        $("#contestModal").css('display', 'none');
    };
    ContestPopupViewmodel.prototype.clear = function () {
        this.attacker = "";
        this.attackerFeature = "";
        this.attackerMagical = false;
        this.attackerScale = false;
        this.attackerQuality = false;
        this.attackerImprobable = false;
        this.attackerImpossible = false;
        this.defender = "";
        this.defenderFeature = "";
        this.defenderMagical = false;
        this.defenderScale = false;
        this.defenderQuality = false;
        this.defenderImprobable = false;
        this.defenderImpossible = false;
        this.defenderPoorFit = false;
        this.attackerRoll = 0;
        this.defenderRoll = 0;
        this.isVictory = false;
    };
    ContestPopupViewmodel.prototype.doContest = function () {
        var roll1 = this.attacker.getContestRoll(this.attackerScale, this.attackerQuality, this.attackerMagical, this.attackerImprobable, this.attackerImpossible);
        var roll2 = this.defender.getContestRoll(this.defenderScale, this.defenderQuality, this.defenderMagical, this.defenderImprobable, this.defenderImpossible);
        if (this.defenderPoorFit) {
            roll2 = Math.min(roll2, this.defender.getContestRoll(this.defenderScale, this.defenderQuality, this.defenderMagical, this.defenderImprobable, this.defenderImpossible));
        }
        this.attackerRoll = roll1;
        this.defenderRoll = roll2;
        var entry = new ActionEntry();
        entry.headerText = this.attacker.name + " attempts to mess with " + this.defender.name;
        entry.subItems.push("They use " + this.attackerFeature);
        entry.subItems.push("It is defended with " + this.defenderFeature);
        if (this.defenderPoorFit) {
            entry.subItems.push("The defender's feature used is a poor fit");
        }
        this.isVictory = roll1 > roll2;
        entry.subItems.push(this.attacker.name + " rolls " + roll1 + " vs. " + roll2 + " resulting in " + (this.isVictory ? "victory!" : "defeat!"));
        return entry;
    };
    return ContestPopupViewmodel;
}());
var FactionTurnViewModel = /** @class */ (function () {
    function FactionTurnViewModel() {
        this.clear();
    }
    FactionTurnViewModel.prototype.open = function () {
        $("#turnModal").css('display', 'block');
    };
    FactionTurnViewModel.prototype.close = function () {
        $("#turnModal").css('display', 'none');
    };
    FactionTurnViewModel.prototype.clear = function () {
        this.faction = {};
        this.internalAction = {};
        this.externalActions = [];
    };
    FactionTurnViewModel.prototype.updateFaction = function () {
        this.externalActions = Array(this.faction.power);
    };
    FactionTurnViewModel.prototype.startFactionTurn = function () {
        this.internalAction.action();
    };
    FactionTurnViewModel.prototype.doNextAction = function () {
        if (this.externalActions.length) {
            var nextAction = this.externalActions.shift();
            if (nextAction) {
                nextAction.action();
            }
        }
    };
    return FactionTurnViewModel;
}());
var ContestOutcomeViewModel = /** @class */ (function () {
    function ContestOutcomeViewModel() {
        this.onSubmit = function () { };
        this.clear();
    }
    ContestOutcomeViewModel.prototype.clear = function () {
        this.faction = {};
        this.damage = 1;
        this.modalChoice = "c";
        this.problem = "";
        this.feature = "";
    };
    ContestOutcomeViewModel.prototype.open = function () {
        $("#outcomeModal").css("display", "block");
    };
    ContestOutcomeViewModel.prototype.close = function () {
        $("#outcomeModal").css("display", "none");
    };
    ContestOutcomeViewModel.prototype.accept = function () {
        if (this.modalChoice === "c") {
            // take cohesion damage
            this.faction.cohesion -= this.damage;
        }
        else if (this.modalChoice === "p") {
            // gain a new problem related to the attack
            this.faction.addProblem(this.problem, this.damage);
        }
        else {
            // sacrifice a feature
            this.faction.features.splice(this.faction.features.indexOf(this.feature), 1);
        }
        this.close();
        this.onSubmit();
    };
    return ContestOutcomeViewModel;
}());
