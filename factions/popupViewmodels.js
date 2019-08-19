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
    }

    clear() {
        this.attacker = "";
        this.attackerFeature = "";
        this.attackerMagical = false;
        this.attackerScale = false;
        this.attackerQuality = false;
        this.attackerMiracle = false;

        this.defender = "";
        this.defenderFeature = "";
        this.defenderMagical = false;
        this.defenderScale = false;
        this.defenderQuality = false;
        this.defenderMiracle = false;
    }
}