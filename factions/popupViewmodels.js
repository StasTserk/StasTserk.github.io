let emColour = 1;
let smColour = 2;

const colourClasses = [
    "em-white",
    "em-black",
    "em-red",
    "em-green",
    "em-blue",
    "em-gold"
];

let emClass = 1;
const emblemClasses = [
    "em-circle",
    "em-shield",
    "em-banner",
    "em-box",
    "em-hex"
];

let smClass = 1;
const symbolClasses = [
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
]

class NewFactionPopupViewmodel {
    constructor() {
        this.clear();
    }

    open() {
        $('#factionModal').css('display', 'block');
    }

    close() {
        $('#factionModal').css('display', 'none');
    }

    clear() {
        this.name = "";
        this.description = "";
        this.power = 1;
        this.dominion = 0;

        this.features = [];
        this.problems = [];
        this.acceptLabel = "Add faction";
        this.onAccept = function () {};

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
    }

    addFeature() {
        this.features.push("");
    }

    addProblem() {
        this.problems.push({ name: "", size: 0 });
    }

    cycleEmblem() {
        console.log("New emblem class is..." + emblemClasses[emClass])
        this.emblemClass = emblemClasses[emClass];
        emClass ++;
        emClass = emClass % emblemClasses.length;
    }

    cycleEmblemColour() {
        this.emblemColour = colourClasses[emColour];
        emColour ++;
        emColour = emColour % colourClasses.length;
    }

    cycleSymbol() {
        this.symbolClass = symbolClasses[smClass];
        smClass ++;
        smClass = smClass % symbolClasses.length;
    }

    cycleSymbolColour() {
        this.symbolColour = colourClasses[smColour];
        smColour ++;
        smColour = smColour % colourClasses.length;
    }

    submit() {
        this.features = this.features.filter(feature => feature.length > 0);
        this.problems = this.problems.filter(problem => problem.text.length > 0 && problem.size > 0);

        let faction = new Faction();
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
        for(var i in this.problems) {
            faction.addProblem(this.problems[i].text, this.problems[i].size);
        }

        console.log(faction);

        return faction;
    }
}

class ContestPopupViewmodel {
    constructor() {
        this.clear();
        this.attackerFeatures = [];
        this.defenderFeatures = [];
        this.onAccept = function () {};
    }

    open() {
        $("#contestModal").css('display', 'block');
    }

    close() {
        $("#contestModal").css('display', 'none');
    }

    clear() {
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
    }

    doContest() {
        var roll1 = this.attacker.getContestRoll(
            this.attackerScale,
            this.attackerQuality,
            this.attackerMagical,
            this.attackerImprobable,
            this.attackerImpossible
        );

        var roll2 = this.defender.getContestRoll(
            this.defenderScale,
            this.defenderQuality,
            this.defenderMagical,
            this.defenderImprobable,
            this.defenderImpossible
        );
        if (this.defenderPoorFit) {
            roll2 = Math.min(roll2, this.defender.getContestRoll(
                this.defenderScale,
                this.defenderQuality,
                this.defenderMagical,
                this.defenderImprobable,
                this.defenderImpossible
            ));
        }

        this.attackerRoll = roll1;
        this.defenderRoll = roll2;
        const entry = new ActionEntry();
        entry.headerText = this.attacker.name + " attempts to mess with " + this.defender.name;
        entry.subItems.push("They use " + this.attackerFeature);
        entry.subItems.push("It is defended with " + this.defenderFeature);
        if (this.defenderPoorFit) {
            entry.subItems.push("The defender's feature used is a poor fit");
        }
        this.isVictory = roll1 > roll2;
        entry.subItems.push(this.attacker.name + " rolls " + roll1 + " vs. " + roll2 + " resulting in " + (this.isVictory ? "victory!" : "defeat!"));
        return entry;
    }
}

class FactionTurnViewModel {
    constructor() {
        this.clear();
    }

    open() {
        $("#turnModal").css('display', 'block');
    }
    
    close() {
        $("#turnModal").css('display', 'none');
    }

    clear() {
        this.faction = {};
        this.internalAction = {};
        this.externalActions = [];
    }

    updateFaction() {
        this.externalActions = Array(this.faction.power);
    }

    startFactionTurn() {
        this.internalAction.action();
    }

    doNextAction() {
        if (this.externalActions.length) {
            const nextAction = this.externalActions.shift();
            if (nextAction) {
                nextAction.action();
            }
        }
    }
}

class ContestOutcomeViewModel {
    constructor() {
        this.clear();
    }

    clear() {
        this.faction = {};
        this.damage = 1;

        this.modalChoice = "c";

        this.problem = "";
        this.feature = "";
    }

    onSubmit = function () { };

    open() {
        $("#outcomeModal").css("display", "block");
    }
    
    close() {
        $("#outcomeModal").css("display", "none");
    }

    accept() {
        if (this.modalChoice === "c") {
            // take cohesion damage
            this.faction.cohesion -= this.damage;
        } else if (this.modalChoice === "p") {
            // gain a new problem related to the attack
            this.faction.addProblem(this.problem, this.damage);
        } else {
            // sacrifice a feature
            this.faction.features.splice(this.faction.features.indexOf(this.feature), 1);
        }
        this.close();
        this.onSubmit();
    }
}