class NewFactionPopupViewmodel {
    constructor() {
        this.clear();
    }

    clear() {
        this.name = "";
        this.description = "";
        this.power = 1;
        this.features = [];
        this.problems = [];
        this.acceptLabel = "Add faction";
        this.onAccept = function () {};
    }

    addFeature() {
        this.features.push("");
    }

    addProblem() {
        this.problems.push({ name: "", size: 0 });
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

        const entry = new ActionEntry();
        entry.headerText = this.attacker.name + " attempts to mess with " + this.defender.name;
        entry.subItems.push("They use " + this.attackerFeature);
        entry.subItems.push("It is defended with " + this.defenderFeature);
        if (this.defenderPoorFit) {
            entry.subItems.push("The defender's feature used is a poor fit");
        }
        entry.subItems.push(this.attacker.name + " rolls " + roll1 + " vs. " + roll2 + " resulting in " + (roll1 > roll2 ? "victory!" : "defeat!"));
        return entry;
    }
}