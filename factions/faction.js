var Faction = /** @class */ (function () {
    function Faction() {
        this.name = "";
        this.power = 1;
        this.cohesion = 1;
        this.cohesionMax = 1;
        this.trouble = 0;
        this.description = "";
        this.emblemClass = "em-shield";
        this.symbolClass = "sm-tree";
        this.emblemColour = "em-black";
        this.symbolColour = "em-white";
        this.dominion = 0;
        this.features = ["A useful feature"];
        this.problems = [];
        this.interest = [];
        this.enemyInterest = [];
    }
    Faction.prototype.fromJson = function (f) {
        this.name = f.name;
        this.power = f.power;
        this.cohesion = f.cohesion;
        this.cohesionMax = f.cohesionMax;
        this.trouble = f.trouble;
        this.emblemClass = f.emblemClass;
        this.symbolClass = f.symbolClass;
        this.emblemColour = f.emblemColour;
        this.symbolColour = f.symbolColour;
        this.dominion = 0;
        this.features = f.features;
        this.interest = f.interest;
        this.enemyInterest = f.enemyInterest;
        this.problems = f.problems;
        this.features = f.features;
        this.description = f.description;
        return this;
    };
    /**
     * Adds a {size} sized problem called {text}. Adds to problem if it already exists
     * @param {string} text
     * @param {number} size
     */
    Faction.prototype.addProblem = function (text, size) {
        var p = this.problems.find(function (p) { return p.text === text; });
        if (p) {
            p.size += size;
        }
        else {
            this.problems.push({ text: text, size: size });
        }
        this.trouble += size;
    };
    Faction.prototype.addInterest = function (faction) {
        var entry = this.interest.find(function (i) { return i.target == faction.name; });
        if (entry) {
            entry.amount++;
        }
        else {
            this.interest.push({ target: faction.name, amount: 1 });
        }
    };
    Faction.prototype.removeInterest = function (faction) {
        var entry = this.interest.find(function (i) { return i.target == faction.name; });
        if (entry) {
            entry.amount--;
            if (entry.amount <= 0) {
                this.interest.splice(this.interest.indexOf(entry), 1);
            }
        }
    };
    Faction.prototype.addEnemyInterest = function (faction) {
        var entry = this.enemyInterest.find(function (i) { return i.target == faction.name; });
        if (entry) {
            entry.amount++;
        }
        else {
            this.enemyInterest.push({ target: faction.name, amount: 1 });
        }
    };
    Faction.prototype.removeEnemyInterest = function (faction) {
        var entry = this.enemyInterest.find(function (i) { return i.target == faction.name; });
        if (entry) {
            entry.amount--;
            if (entry.amount <= 0) {
                this.enemyInterest.splice(this.enemyInterest.indexOf(entry), 1);
            }
        }
    };
    /**
     * Reduces a given problem by an amount, possibly removing it
     * @param {{ text: string, size: number}} problem problem to modify
     * @param {number} size number of points to reduce the problem by
     */
    Faction.prototype.reduceProblem = function (problem, change) {
        if (change === void 0) { change = 1; }
        if (problem.size < change) {
            change = problem.size;
        }
        problem.size -= change;
        this.trouble -= change;
        if (problem.size <= 0) {
            var index = this.problems.indexOf(problem);
            this.problems.splice(index, 1);
        }
    };
    Faction.prototype.getRoll = function () {
        return this.getActionRoll(this.getActionDie());
    };
    Faction.prototype.getActionDie = function () {
        switch (this.power) {
            case 1: return 6;
            case 2: return 8;
            case 3: return 10;
            case 4: return 12;
            default: return 20;
        }
    };
    Faction.prototype.getActionRoll = function (dieSize) {
        return Math.ceil(Math.random() * dieSize);
    };
    Faction.prototype.getContestRoll = function (scale, quality, magic, improbable, impossible) {
        var bonus = scale ? 1 : 0;
        if (quality) {
            bonus++;
        }
        if (magic) {
            bonus++;
        }
        if (impossible) {
            bonus += 2;
        }
        else if (improbable) {
            bonus++;
        }
        var roll = this.getRoll();
        console.log(this.name + " rolls " + roll + " + " + bonus);
        return roll + bonus;
    };
    return Faction;
}());
var ActionEntry = /** @class */ (function () {
    function ActionEntry() {
        this.headerText = "";
        this.subItems = [];
    }
    return ActionEntry;
}());
// some dfaults
var faction1 = new Faction();
faction1.name = "A minor parasite god cult";
faction1.description = "A parasite god and the group of followers they managed to attract.";
faction1.power = 1;
faction1.cohesion = 1;
faction1.cohesionMax = 1;
faction1.addProblem("Neighbors fear and hate them.", 1);
faction1.addProblem("Their god makes cruel demands.", 1);
faction1.features = [
    "Their god deals savagely with threats.",
];
faction1.emblemClass = "em-banner";
faction1.emblemColour = "em-red";
faction1.symbolClass = "sm-skull";
faction1.symbolColour = "em-white";
var faction2 = new Faction();
faction2.name = "Xilong, a city in the Dulimbai Regency";
faction2.description = "A prosperous city state on the Patrian border, ruled benevolently by a magistrate";
faction2.power = 2;
faction2.cohesion = 2;
faction2.cohesionMax = 2;
faction2.addProblem("Collegium sorcerer-academics scheme to seize control of the city's ruling magistrate", 1);
faction2.addProblem("Patrian agents of terror strive to disrupt the city's trade and peace.", 1);
faction2.features = [
    "The famed Bronze Collegium there teaches arts both magical and mundane.",
    "Xilong is a proud jewel of the Regency, and the Regent is inclined to aid it in need."
];
faction2.emblemClass = "em-shield";
faction2.emblemColour = "em-green";
faction2.symbolClass = "sm-eye";
faction2.symbolColour = "em-white";
var faction3 = new Faction();
faction3.name = "The Unitary Church of Patria";
faction3.description = "The dominant religioun in the kingdom of Patria, ruled by powerful clerics and deeply entrenched.";
faction3.power = 3;
faction3.cohesion = 3;
faction3.cohesionMax = 3;
faction3.addProblem("The Patrian emperor tends to view the church as his property.", 2);
faction3.addProblem("Reformist priests are disrupting the church with their demands.", 1);
faction3.features = [
    "Most Patrians are loyal servants of the faith.",
    "The church is extremely wealthy.",
    "Many secrets are confessed to its priests."
];
faction3.emblemClass = "em-circle";
faction3.emblemColour = "em-blue";
faction3.symbolClass = "sm-bolt";
faction3.symbolColour = "em-white";
faction3.addInterest(faction1);
faction1.addEnemyInterest(faction3);
faction3.addInterest(faction1);
faction1.addEnemyInterest(faction3);
faction1.addInterest(faction2);
faction2.addEnemyInterest(faction1);
