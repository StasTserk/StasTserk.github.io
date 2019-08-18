class Faction {
    constructor(){
        this.name = "";
        this.power = 1;
        this.cohesion = 1;
        this.cohesionMax = 1;
        this.actionDie = 6;
        this.trouble = 0;

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
        if (this.problems[text]) {
            this.problems[text] += size;
        }
        else {
            this.problems[text] = size;
        }
        this.trouble += size;
    }
    
}