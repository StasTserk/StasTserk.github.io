function Npc () {
    this.race = "";
    this.class = "";
    this.alignment = "";
    this.profession = "";
    this.attitude = "";
    this.relationship = "";

    return this;
};

Npc.prototype.SimpleDescription = function () {
    return GetSimpleNpcText(this);
}

function GenerateNpc(setProperties, addClass) {
    var npc = new Npc();
    
    npc.race = setProperties.race || GetTableResult(95, Table_Race);
    npc.alignment = setProperties.alignment || GetTableResult(d(6) + d(6) + d(6), Table_Alignment);
    npc.profession = setProperties.profession || GetTableResult(d(100), Table_Occupation);
    npc.attitude = setProperties.attitude || GetTableResult(d(4)+d(4)+d(4), Table_Relationship);
    npc.status = setProperties.status || GetTableResult(d(6)+d(6)+d(6), Table_Status);
    npc.relationship = setProperties.relationship || "None";

    if (addClass || npc.profession == "Adventurer") {
        npc.class = setProperties.class || GetTableResult(d(100), Table_Class);
    }

    return npc;
};

// =======================================================================
function d(sides) {
    return Math.ceil(Math.random() * sides);
};

function coin () {
    return d(2) == 1;
};

function option(options) {
    var index = Math.floor(Math.random() * options.length);
    return options[index];
};

function GetTableResult(roll, table) {
    var text;
    for (i = 0; i < table.length; i ++) {
        if (roll < table[i].roll)
        {
            return table[i-1].text();
        }
    }
    return table[table.length-1].text();
};

function GetSimpleNpcText(npc) {
    var result = npc.alignment + " " 
        + npc.race + " "
        + (npc.class || npc.profession) + " who is " +
        npc.attitude + " twoards you. They are " +
        npc.status;

    return result;
}

// ==========================================================================
// generator
function Backstory(race, pClass, profession, chaMod, numEvents) {
    race = race || "Tiefling";
    pClass = pClass || "Fighter";
    profession = profession || "Acolyte";
    chaMod = chaMod || 0;
    numEvents = numEvents || 10;

    this.race = race;
    this.class = pClass;
    this.profession = profession;
    this.chaMod = chaMod;
    this.numEvents= numEvents;

    this.childhoodText = [];
    this.events = [];
    this.knownNpcs = [];
    // generate childhood
    this.GenerateChildhood();

    for (var i = 0; i < numEvents; i ++) {
        this.GenerateLifeEvent();
    }

    return this;
};

Backstory.prototype.GenerateChildhood = function() {
    var parentsRoll = d(100);

    var knowParents = parentsRoll <= 95;

    this.childhoodText.push(GetTableResult(parentsRoll, Table_Parents));
    
    // generate parent npcs
    var parent1Race = this.race;
    var parent2Race = this.race;
    
    if (knowParents) {
        if (this.race == "Half-elf") {
            var raceRoll = d(8);
            // this.childhoodText.push(GetTableResult(raceRoll, Table_HalfElfParents));
            switch (raceRoll) {
                case 6:
                    parent1Race = "Elf"; break;
                case 7:
                    parent1Race = "Human"; break;
                case 8: break;
                default: parent1Race = "Elf"; parent2Race = "Human";
            }
        }

        if (this.race == "Half-orc") {
            var raceRoll = d(8);
            // this.childhoodText.push(GetTableResult(raceRoll, Table_HalfOrcParents));
            switch (raceRoll) {
                case 4: case 5:
                    parent1Race = "Orc"; break;
                case 6: case 7:
                    parent1Race = "Human"; break;
                case 8: break;
                default: parent1Race = "Orc"; parent2Race = "Human";
            }
        }

        if (this.race == "Tiefling") {
            var raceRoll = d(8);
            // this.childhoodText.push(GetTableResult(raceRoll, Table_TieflingParents));
            switch (raceRoll) {
                case 6: case 5:
                    parent1Race = "Human"; break;
                case 7:
                    parent1Race = "Devil"; break;
                case 8: break;
                default: parent1Race = "Human"; parent2Race = "Human";
            }
        }

        parent1 = GenerateNpc({ race: parent1Race, attitude: "Friendly", relationship: "Parent" });
        parent2 = GenerateNpc({ race: parent2Race, attitude: "Friendly", relationship: "Parent" });

        this.knownNpcs.push(parent1, parent2);
        this.childhoodText.push("Parent 1: " + GetSimpleNpcText(parent1));
        this.childhoodText.push("Parent 2: " + GetSimpleNpcText(parent2));
    }

    // birthplace
    this.childhoodText.push("you were born " + GetTableResult(d(100), Table_Birthplace));

    if (d(100) == 100) {
        this.childhoodText.push("Your birth was marked by " + option([
            "the moon turning red for a time.", 
            "all the milk within a mile spoiling.",
            "the water in the area freezing solid in midsummer.",
            "all the iron in the home rusting.",
            "all the iron in the home turning to silver.",
        ]))
    }

    // siblings
    var siblingsRoll = d(10);
    var numSiblings = 0;
    if (siblingsRoll > 2) {
        this.childhoodText.push("You had " + option([d(3), d(4)+1, d(6)+2, d(8)+3]) + " siblings. Your birth order was: " + GetTableResult(d(6)+d(6), Table_BirthOrder))
    } else {
        this.childhoodText.push("You were an only child")
    }

    // family
    var familyRoll = d(100);
    this.childhoodText.push("You were raised " + GetTableResult(familyRoll, Table_Family));

    // absent parent
    if (familyRoll < 76 || !knowParents) {
        this.childhoodText.push("One or both of your parents were absent because " + GetTableResult(d(4), Table_AbsentParent));
    }

    // family lifestyle
    var lifestyleRoll = d(6) + d(6) + d(6);
    this.childhoodText.push("Growing up your family lived a " + GetTableResult(lifestyleRoll, Table_FamilyLifestyle) + " lifestyle.")

    // childhood home
    var homeModifier = -40;
    if (lifestyleRoll > 3) { homeModifier = -20; }
    if (lifestyleRoll > 5) { homeModifier = -10; }
    if (lifestyleRoll > 8) { homeModifier = 0; }
    if (lifestyleRoll > 12) { homeModifier = 10; }
    if (lifestyleRoll > 15) { homeModifier = 20; }
    if (lifestyleRoll > 17) { homeModifier = 40; }
    this.childhoodText.push("You grew up " + GetTableResult(d(100) + homeModifier, Table_ChildhoodHome));
    
    // childhood memories
    this.childhoodText.push(GetTableResult(this.chaMod + d(6)+d(6)+d(6), Table_ChildhoodMemories));
};

Backstory.prototype.GenerateLifeEvent = function() {
    var eventRoll = d(100);
    var eventText = GetTableResult(eventRoll, Table_LifeEvents);

    if (eventRoll < 11) {
        // tragedy
        eventText += " " + GetTableResult(d(12), Table_Tragedies);
    } else if (eventRoll < 21) {
        // fortune
        var boonRoll = d(12);
        eventText += " " + GetTableResult(d(12), Table_Boons);

        if (boonRoll == 2) {
            var helpedCommoner = GenerateNpc({ attitude: "Friendly", status: "alive and well", relationship: "Follower"});
            this.knownNpcs.push(helpedCommoner);
            eventText += " " + GetSimpleNpcText(helpedCommoner);
        }
    } else if (eventRoll < 31) {
        // fell in love
        var loveNpc = GenerateNpc({ attitude: "Friendly", relationship: "Love" });
        eventText += " " + GetSimpleNpcText(loveNpc) + "; if this is not the first time rolling this option, you may choose this to be a child."; 
        this.knownNpcs.push(loveNpc);
    } else if (eventRoll < 41) {
        // enemy
        var enemy = GenerateNpc({ attitude: "Hostile", relationship: "Enemy", profession: "Adventurer"}, true);
        this.knownNpcs.push(enemy);
        eventText += " " + GetSimpleNpcText(enemy);
    } else if (eventRoll < 51) {
        // friend
        var friendAdventurer = GenerateNpc({ attitude: "Friendly", relationship: "Friend", profession: "Adventurer"}, true);
        this.knownNpcs.push(friendAdventurer)
        eventText += " " + GetSimpleNpcText(friendAdventurer);
    } else if (eventRoll < 71) {
        // worked a job
    } else if (eventRoll < 76) {
        // met an important npc
        var importantNpc = GenerateNpc({ relationship: "Important Npc"});
    } else if (eventRoll < 81) {
        // you went on an adventure
        eventText += " " + GetTableResult(d(100), Table_Adventures);
    } else if (eventRoll < 86) {
        // you had a supernatural experience
        eventText += " " + GetTableResult(d(100), Table_SupernaturalEvents);
    } else if (eventRoll < 91) {
        // fought in a battle
        eventText += " " + GetTableResult(d(12), Table_War);
    } else if (eventRoll < 96) {
        // commited a crime
        eventText = "You were accused of " + GetTableResult(d(8), Table_Crime) + " - " + GetTableResult(d(4), Table_Punishment);
    } else if (eventRoll < 100) {
        // encountered something magical
        eventText += " " + GetTableResult(d(10), Table_ArcaneMatters);
    } else {
        // something truly strange happened
        eventText += " " + GetTableResult(d(12), Table_WierdStuff);
    }
    this.events.push(eventText);
}

var bs = new Backstory();