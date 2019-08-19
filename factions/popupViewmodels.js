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
    }

    addFeature() {
        this.features.push("");
    }

    addProblem() {
        this.problems.push({ name: "", size: 0 });
    }

    submit() {
        this.features = this.features.filter(feature => feature.length > 0);
        this.problems = this.problems.filter(problem => problem.name.length > 0 && problem.size > 0);

        let faction = new Faction();
        faction.power = this.power;
        faction.name = this.name;
        faction.description = this.description;
        faction.cohesion = this.power;
        faction.cohesionMax = this.power;

        faction.features = this.features;
        for(var i in this.problems) {
            faction.addProblem(this.problems[i].name, this.problems[i].size);
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
            roll2 = Math.min(this.defender.getContestRoll(
                this.defenderScale,
                this.defenderQuality,
                this.defenderMagical,
                this.defenderImprobable,
                this.defenderImpossible
            ));
        }
        if (roll1 > roll2) {
            return "Victory!";
        }
        return "Defeat!";
    }
}