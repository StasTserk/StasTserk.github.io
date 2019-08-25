class Faction {
    constructor(){
        this.name = "";
        this.power = 1;
        this.cohesion = 1;
        this.cohesionMax = 1;
        this.actionDie = 6;
        this.trouble = 0;

        this.emblemClass = "em-shield";
        this.emblemSymbolClass = "sm-tree";
        this.emblemColour = "em-black";
        this.emblemSymbolColour = "em-white";

        this.dominion = 0;
        this.features = [ "A useful feature" ];
        this.problems = [];
        this.influence = [ { target: "A faction", amount: 1 }];
    }

    /**
     * Adds a {size} sized problem called {text}. Adds to problem if it already exists
     * @param {string} text 
     * @param {number} size 
     */
    addProblem(text, size){
        var p = this.problems.find(p => p.text === text);
        if (p) {
            p.size += size;
        } else {
            this.problems.push({ text: text, size: size });
        }
        this.trouble += size;
    }

    getRoll() {
        switch(this.power) {
            case 1: return this.getActionRoll(6);
            case 2: return this.getActionRoll(8);
            case 3: return this.getActionRoll(10);
            case 4: return this.getActionRoll(12);
            case 5: return this.getActionRoll(20);
        }

    }

    getActionRoll(dieSize) {
        return Math.ceil(Math.random() * dieSize);
    }

    getContestRoll(scale, quality, magic, improbable, impossible) {
        let bonus = scale ? 1 : 0;
        if (quality) { bonus ++; }
        if (magic) { bonus ++; }
        if (impossible) { bonus += 2; }
        else if (improbable) { bonus ++; }
        
        const roll = this.getRoll();
        console.log(this.name + " rolls " + roll + " + " + bonus);
        return roll+bonus;
    }
}

class ActionEntry {
    constructor() {
        this.headerText = "";
        this.subItems = [];
    }
}

// some dfaults
const faction1 = new Faction();
faction1.name = "A Big Faction";
faction1.description = "A big faction that is there to fuck shit up";
faction1.power = 4;
faction1.cohesion = 4;
faction1.cohesionMax = 4;
faction1.addProblem("A wanton disregard for the little guy.", 3);
faction1.addProblem("A complete lack of empathy", 4);
faction1.features = [
    "A large and powerful standing army",
    "A large collection of the finest wall scrolls in the land"
];

faction1.emblemClass = "em-banner";
faction1.emblemColour = "em-red";
faction1.symbolClass = "sm-skull";
faction1.symbolColour = "em-white"

const faction2 = new Faction();
faction2.name = "A Small Faction";
faction2.description = "A small faction that is only there to get rekt";
faction2.power = 1;
faction2.cohesion = 1;
faction2.cohesionMax = 1;
faction2.addProblem("A pretty severe inferiority complex", 2);
faction2.addProblem("A pretty severe inferiority complex", 1);
faction2.features = ["A healthy respect for the little guy."];

faction2.emblemClass = "em-shield";
faction2.emblemColour = "em-green";
faction2.symbolClass = "sm-tree";
faction2.symbolColour = "em-white"