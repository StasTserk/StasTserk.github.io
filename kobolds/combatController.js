
// =========================================================================
// Damage Die Class
// =========================================================================
function DamageDie() {
    this.sides = 6;

    return this;
};

DamageDie.prototype.GetRoll = function() {
    return Math.ceil(Math.random() * this.sides);
}

function Player() {
    this.attackBonus = 8;
    this.damage = "1d6+4";
    this.criticalHitDamage = "1d6+0";
    this.attacksPerRound = 2;

    return this;
}

// =========================================================================
// Combat Controller Class
// =========================================================================
var damageStringPattern = /^(\d+)d(\d+)([+-])(\d+)/;

function CombatController() {
    this.damageDice = [ new DamageDie() ];
    this.damageBonus = 4;
    this.attackBonus = 8;
    this.critBonusDice = [ new DamageDie() ];
    this.critBonus = 0;
    this.attacksPerRound = 2;

    this.targetAc = 11;
    this.targetHp = 8;

    this.roundsToSim = 1000;
    this.killTotal = 0;
    this.roundsTotal = 0;
    this.kpr = 0;

    return this;
};

CombatController.prototype.rollDamage = function() {
    var sum = this.damageBonus;
    var i = 0;
    for (i = 0; i < this.damageDice.length; i ++) {
        sum += this.damageDice[i].GetRoll();
    }
    return sum;
};

CombatController.prototype.rollCritDamage = function () {
    var sum = this.critBonus;
    var i = 0;
    for (i = 0; i < this.damageDice.length; i ++) {
        sum += this.critBonusDice[i].GetRoll();
    }
    return sum;
};

CombatController.prototype.doAttack = function() {
    var dieRoll = Math.ceil(Math.random() * 20);

    if (dieRoll == 1 || 
        dieRoll != 20 && 
        dieRoll + this.attackBonus < this.targetAc) {
        return 0;
    }
    
    // scored a hit
    var damageDealt = this.rollDamage();
    if (dieRoll == 20)
    {
        damageDealt += this.rollCritDamage();
    }
    return damageDealt;
};

CombatController.prototype.parseDamageString = function(damageString)
{
    var result = parseString(damageString);
    if (result)
    {
        this.damageDice = result.dice;
        this.damageBonus = result.bonus;
        return true;
    }
    return false;
};

CombatController.prototype.parseCritString = function(critString) {
    var result = parseString(critString);
    if (result)
    {
        this.critBonusDice = result.dice;
        this.critBonus = result.bonus;
        return true;
    }
    return false;
}

CombatController.prototype.runSim = function()
{
    var remainingHp = this.targetHp;
    var damageDealt, timesAttacked;

    this.killTotal = 0;
    this.roundsTotal = 0;
    for (this.roundsTotal = 0; this.roundsTotal < this.roundsToSim; this.roundsTotal ++) {
        for (timesAttacked = 0; timesAttacked < this.attacksPerRound; timesAttacked ++) {
            var damageDealt = this.doAttack();
            remainingHp -= damageDealt;
            if (remainingHp <= 0) {
                this.killTotal ++;
                remainingHp = this.targetHp;
            }
        }
    }
    this.kpr = this.killTotal / this.roundsTotal;
};

// =========================================================================
function isValidDamageString(damageString) {
    
    return damageStringPattern.test(damageString);
}

function parseString(damageString) {
    if (!isValidDamageString(damageString))
    {
        console.log("invalid damage string: " + damageString);
        return null;
    }
    var result = damageStringPattern.exec(damageString);

    var dice = new DamageDie();
    dice.sides = parseInt(result[2]);
    var damageDice = Array(parseInt(result[1])).fill(dice);
    var damageBonus = parseInt(result[4]) * (result[3] == '+' ? 1 : -1);

    return { dice: damageDice, bonus: damageBonus };
}
