var Table_Alignment = [
    {
        roll: 3,
        text: function () {
            return "Chaotic " + option(["Evil", "Good"]);
        }
    },
    {
        roll: 4,
        text: function () {
            return "Lawful Evil";
        }
    },
    {
        roll: 6,
        text: function () {
            return "Neutral Evil";
        }
    },
    {
        roll: 9,
        text: function () {
            return "Neutral";
        }
    },
    {
        roll: 13,
        text: function () {
            return "Neutral Good";
        }
    },
    {
        roll: 16,
        text: function () {
            return "Lawful " + option(["Good", "Neutral"]);
        }
    },
    {
        roll: 18,
        text: function () {
            return "Chaotic " + option(["Good", "Neutral"]);
        }
    }
];

var Table_Class = [
    {
        roll: 1,
        text: function () {
            return "Barbarian";
        }
    },
    {
        roll: 8,
        text: function () {
            return "Bard";
        }
    },
    {
        roll: 15,
        text: function () {
            return "Cleric";
        }
    },
    {
        roll: 30,
        text: function () {
            return "Druid";
        }
    },
    {
        roll: 37,
        text: function () {
            return "Fighter";
        }
    },
    {
        roll: 53,
        text: function () {
            return "Monk";
        }
    },
    {
        roll: 59,
        text: function () {
            return "Paladin";
        }
    },
    {
        roll: 65,
        text: function () {
            return "Ranger";
        }
    },
    {
        roll: 71,
        text: function () {
            return "Rogue";
        }
    },
    {
        roll: 85,
        text: function () {
            return "Sorcerer";
        }
    },
    {
        roll: 90,
        text: function () {
            return "Warlock";
        }
    },
    {
        roll: 95,
        text: function () {
            return "Wizard";
        }
    }
];

var Table_Occupation = [
    {
        roll: 1,
        text: function () {
            return "Academic";
        }
    },
    {
        roll: 6,
        text: function () {
            return "Adventurer";
        }
    },
    {
        roll: 11,
        text: function () {
            return "Aristocrat";
        }
    },
    {
        roll: 12,
        text: function () {
            return option(["Artisan", "Guild Member"]);
        }
    },
    {
        roll: 27,
        text: function () {
            return "Criminal";
        }
    },
    {
        roll: 32,
        text: function () {
            return "Entertainer";
        }
    },
    {
        roll: 37,
        text: function () {
            return option(["Exile", "Hermit", "Refugee"]);
        }
    },
    {
        roll: 39,
        text: function () {
            return option(["Explorer", "Wanderer"]);
        }
    },
    {
        roll: 44,
        text: function () {
            return option(["Farmer", "Herder"]);
        }
    },
    {
        roll: 56,
        text: function () {
            return option(["Hunter", "Trapper"]);
        }
    },
    {
        roll: 61,
        text: function () {
            return "Laborer";
        }
    },
    {
        roll: 76,
        text: function () {
            return "Merchant";
        }
    },
    {
        roll: 81,
        text: function () {
            return "Politician";
        }
    },
    {
        roll: 86,
        text: function () {
            return "Priest";
        }
    },
    {
        roll: 91,
        text: function () {
            return "Sailor";
        }
    },
    {
        roll: 96,
        text: function () {
            return "Soldier";
        }
    }
];

var Table_Race = [
    {
        roll: 1,
        text: function () {
            return "Human";
        }
    },
    {
        roll: 41,
        text: function () {
            return "Dwarf";
        }
    },
    {
        roll: 51,
        text: function () {
            return "Elf";
        }
    },
    {
        roll: 61,
        text: function () {
            return "Halfling";
        }
    },
    {
        roll: 71,
        text: function () {
            return "Dragonborn";
        }
    },
    {
        roll: 76,
        text: function () {
            return "Gnome";
        }
    },
    {
        roll: 81,
        text: function () {
            return "Half-elf";
        }
    },
    {
        roll: 86,
        text: function () {
            return "Half-orc";
        }
    },
    {
        roll: 91,
        text: function () {
            return "Tiefling";
        }
    },
    {
        roll: 95,
        text: function () {
            return GetTableResult(d(95), Table_Race);
        }
    }
];

var Table_Relationship = [
    {
        roll: 3,
        text: function () {
            return "Hostile";
        }
    },
    {
        roll: 5,
        text: function () {
            return "Friendly";
        }
    },
    {
        roll: 11,
        text: function () {
            return "Indifferent";
        }
    }
];

var Table_Status = [
    {
        roll: 3,
        text: function () {
            return "Dead - " + GetTableResult(d(12), Table_CauseOfDeath);
        }
    },
    {
        roll: 4,
        text: function () { 
            return "Missing/Unknown";
        }
    },
    {
        roll: 6,
        text: function () {
            return "Alive but doing poorly due to " + option(["Financial trouble", "injury", "relationship difficulties"]);
        }
    },
    {
        roll: 9,
        text: function () { 
            return "Alive and well";
        }
    },
    {
        roll: 13,
        text: function () { 
            return "Alive and quite successful";
        }
    },
    {
        roll: 16,
        text: function () {
            return "Alive and infamous";
        }
    },
    {
        roll: 18,
        text: function () { 
            return "Alive and famous";
        }
    }
];

var Table_CauseOfDeath = [
    {
        roll: 1,
        text: function () {
            return option([
                "Unkown",
                "Murdered",
                "Killed in battle",
                "Accident related to class/job",
                "Accident unrelated to class/job",
                "Natural causes",
                "Apparent suicide",
            ]);
        }
    },
    {
        roll: 9,
        text: function () {
            return option(["Torn apart by an animal", "Natural disaster"]);
        }
    },
    {
        roll: 10,
        text: function () {
            return "Consumed by a monster";
        }
    },
    {
        roll: 11,
        text: function () {
            return option(["Executed for a crime", "Tortured to death"]);
        }
    },
    {
        roll: 12,
        text: function () {
            return option(["Struck by a meteorite", "Struck down by an angry god", "Killed by a hatching slaad egg"]);
        }
    }
];

var Table_Parents = [
    {
        roll: 1,
        text: function () {
            return "You know who your parents are/were."
        }
    },
    {
        roll: 96,
        text: function () {
            return "You do not know who your parents were."
        }
    }
];

var Table_HalfElfParents = [
    {
        roll: 1,
        text: function () {
            return "One parent was an elf and the other was a human.";
        }
    },
    {
        roll: 6,
        text: function () {
            return "One parent was an elf and the other was a half-elf.";
        }
    },
    {
        roll: 7,
        text: function () {
            return "One parent was an human and the other was a half-elf.";
        }
    },
    {
        roll: 8,
        text: function () {
            return "Both parents were half-elves.";
        }
    }
];

var Table_HalfOrcParents = [
    {
        roll: 1,
        text: function () {
            return "One parent was an orc and the other was a human.";
        }
    },
    {
        roll: 4,
        text: function () {
            return "One parent was an orc and the other was a half-orc.";
        }
    },
    {
        roll: 6,
        text: function () {
            return "One parent was an human and the other was a half-orc.";
        }
    },
    {
        roll: 8,
        text: function () {
            return "Both parents were half-orcs.";
        }
    }
];

var Table_TieflingParents = [
    {
        roll: 1,
        text: function () {
            return "One parent was a devil and the other was a human.";
        }
    },
    {
        roll: 5,
        text: function () {
            return "One parent was an devil and the other was a tiefling.";
        }
    },
    {
        roll: 7,
        text: function () {
            return "One parent was an human and the other was a tiefling.";
        }
    },
    {
        roll: 8,
        text: function () {
            return "Both parents were human.";
        }
    }
];

var Table_Birthplace = [

    {
        roll: 1,
        text: function () {
            return "in your family's home";
        }
    },
    {
        roll: 51,
        text: function () {
            return "in the home of a family friend";
        }
    },
    {
        roll: 56,
        text: function () {
            return "in the home of a healer or midwige";
        }
    },
    {
        roll: 64,
        text: function () {
            return "in a " + option(["cart", "carriage", "wagon"]);
        }
    },
    {
        roll: 66,
        text: function () {
            return "in a" + option([" barn", " shed", "n outbuilding"]);
        }
    },
    {
        roll: 69,
        text: function () {
            return "in a Cave";
        }
    },
    {
        roll: 71,
        text: function () {
            return "in a field";
        }
    },
    {
        roll: 73,
        text: function () {
            return "in a forest";
        }
    },
    {
        roll: 75,
        text: function () {
            return "in a temple";
        }
    },
    {
        roll: 78,
        text: function () {
            return "on a battlefield";
        }
    },
    {
        roll: 79,
        text: function () {
            return "in an alley";
        }
    },
    {
        roll: 81,
        text: function () {
            return "in a " + option(["a Brothel", "a Tavern", "an inn"]);
        }
    },
    {
        roll: 83,
        text: function () {
            return "in a " + option(["castle", "keep", "tower", "palace"]);
        }
    },
    {
        roll: 85,
        text: function () {
            return "in a " + option(["sewer", "rubbish heap"]);
        }
    },
    {
        roll: 86,
        text: function () {
            return "among people of a different race";
        }
    },
    {
        roll: 89,
        text: function () {
            return "on board a ship";
        }
    },
    {
        roll: 92,
        text: function () {
            return option(["in a prison of a secret organization"],
                "in the headquarters of a secret organization");
        }
    },
    {
        roll: 94,
        text: function () {
            return "in a sage's laboratory.";
        }
    },
    {
        roll: 96,
        text: function () {
            return "in the feywild.";
        }
    },
    {
        roll: 97,
        text: function () {
            return "in the Shadowfell.";
        }
    },
    {
        roll: 98,
        text: function () {
            return option(["on the Astral plane", "on the Ethereal plane"]);
        }
    },
    {
        roll: 99,
        text: function () {
            return "on the plane of " + option([
                "Fire", "Ash", "Air",
                "Ice", "Water", "Ooze",
                "Earth", "Magma"
            ]);
        }
    },
    {
        roll: 100,
        text: function () {
            return "in " + option([
                "Bytopia", "Mount Celestia", "Elysium",
                "the Beastlands", "Arborea", "Ysgard",
                "Limbo", "Pandemonium", "the Abyss",
                "Carceri", "Hades", "Gehenna", "the Nine Hells",
                "Mechanus", "Acheron", "Arcadia", "Sigil"
            ]);
        }
    },
];

var Table_BirthOrder = [
    {
        roll: 2,
        text: function() {
            return "Twin, triplet of quadruplet";
        }
    },
    {
        roll: 3,
        text: function() {
            return "Older";
        }
    },
    {
        roll: 8,
        text: function() {
            return "Younger";
        }
    }
];

var Table_Family = [
    {
        roll: 1,
        text: function () {
            return "by no one.";
        }
    },
    {
        roll: 2,
        text: function () {
            return "in an asylum.";
        }
    },
    {
        roll: 3,
        text: function () {
            return "in a temple.";
        }
    },
    {
        roll: 4,
        text: function () {
            return "in an orphanage.";
        }
    },
    {
        roll: 6,
        text: function () {
            return "by a guardian.";
        }
    },
    {
        roll: 8,
        text: function () {
            return "by a " + option(["paternal aunt", "paternal uncle", "paternal aunt", "maternal uncle", "your tribe"]);
        }
    },
    {
        roll: 16,
        text: function () {
            return "by your paternal or maternal grandparents";
        }
    },
    {
        roll: 26,
        text: function () {
            return "by your adoptive family";
        }
    },
    {
        roll: 36,
        text: function () {
            return "by a single " + option(["father", "stepfather"]);
        }
    },
    {
        roll: 56,
        text: function () {
            return "by a single " + option(["mother", "stepmother"]);
        }
    },
    {
        roll: 76,
        text: function () {
            return "by your mother and father";
        }
    }
];

var Table_AbsentParent = [
    {
        roll: 1,
        text: function () {
            return "they died - " + GetTableResult(d(12), Table_CauseOfDeath);
        }
    },
    {
        roll: 2,
        text: function () {
            return "they were " + option(["imprisoned", "enslaved", "taken away"]);
        }
    },
    {
        roll: 3,
        text: function () {
            return "you were abandoned.";
        }
    },
    {
        roll: 4,
        text: function () {
            return "they disappeared to an unknown fate";
        }
    }
];

var Table_FamilyLifestyle = [
    {
        roll: 3,
        text: function () {
            return "Wretched";
        }
    },
    {
        roll: 4,
        text: function () {
            return "Squalid";
        }
    },
    {
        roll: 6,
        text: function () {
            return "Poor";
        }
    },
    {
        roll: 9,
        text: function () {
            return "Modest";
        }
    },
    {
        roll: 13,
        text: function () {
            return "Comfortable";
        }
    },
    {
        roll: 16,
        text: function () {
            return "Wealthy";
        }
    },
    {
        roll: 18,
        text: function () {
            return "Aristocratic";
        }
    }
];

var Table_ChildhoodHome = [
    {
        roll: -50,
        text: function () {
            return "on the streets";
        }
    },
    {
        roll: 1,
        text: function () {
            return "in a rundown Shack";
        }
    },
    {
        roll: 21,
        text: function () {
            return "at no permanent residence; you moved around a lot";
        }
    },
    {
        roll: 31,
        text: function () {
            return "in an " + option(["Encampment", "Village"]) + " in the wildreness";
        }
    },
    {
        roll: 41,
        text: function () {
            return "in an apartment in a rundown neighborhood.";
        }
    },
    {
        roll: 51,
        text: function () {
            return "in a small house";
        }
    },
    {
        roll: 71,
        text: function () {
            return "in a large house";
        }
    },
    {
        roll: 91,
        text: function () {
            return "in a mansion";
        }
    },
    {
        roll: 111,
        text: function () {
            return "in a " + option(["palace", "castle"]);
        }
    }
];

var Table_ChildhoodMemories = [
    {
        roll: -5,
        text: function () {
            return "You are still haunted by your childhood, when you were treated badly by your peers.";
        }
    },
    {
        roll: 4,
        text: function () {
            return "You spent most of your childhood alone, with no close friends.";
        }
    },
    {
        roll: 6,
        text: function () {
            return "Others saw you as being different or strange, so you had few companions.";
        }
    },
    {
        roll: 9,
        text: function () {
            return "You had a few close friends and lived an ordinary childhood.";
        }
    },
    {
        roll: 13,
        text: function () {
            return "You had several friends, and your childhood was generally a happy one.";
        }
    },
    {
        roll: 16,
        text: function () {
            return "You always found it easy to make friends and you loved being around people.";
        }
    },
    {
        roll: 18,
        text: function () {
            return "Everyone knew who you were, and you had friends everywhere you went.";
        }
    }
];

var Table_LifeEvents = [
    {
        roll: 1,
        text: function () {
            return "You suffered a tragedy.";
        }
    },
    {
        roll: 11,
        text: function () {
            return "You gained a bit of good fortune.";
        }
    },
    {
        roll: 21,
        text: function () {
            return "You fell in love or got married.";
        }
    },
    {
        roll: 31,
        text: function () {
            return "You made an enemy of an adventurer. It was " + option(["your", "their"]) + " fault.";
        }
    },
    {
        roll: 41,
        text: function () {
            return "You made a friend of an adventurer.";
        }
    },
    {
        roll: 51,
        text: function () {
            return "You spent time working a job relating to your background and earned " + (d(6)+d(6)) + "gp.";
        }
    },
    {
        roll: 71,
        text: function () {
            return "You met someone important.";
        }
    },
    {
        roll: 76,
        text: function () {
            return "You went on an adventure.";
        }
    },
    {
        roll: 81,
        text: function () {
            return "You had a supernatural experience.";
        }
    },
    {
        roll: 86,
        text: function () {
            return "You fought in a battle.";
        }
    },
    {
        roll: 91,
        text: function () {
            return "You commited a crime or were wrongly accused of doing so.";
        }
    },
    {
        roll: 96,
        text: function () {
            return "You encountered something magical.";
        }
    },
    {
        roll: 100,
        text: function () {
            return "Something truly strange happened to you.";
        }
    }
];

var Table_Adventures = [
    {
        roll: 1,
        text: function () {
            return "You nearly died. You have nasty scars on your body and are missing an ear, " + d(3) + " fingers, or " + d(4) + " toes.";
        }
    },
    {
        roll: 11,
        text: function () {
            return "You suffered a grievous injury. Although the wound healed, it still pains you from time to time.";
        }
    },
    {
        roll: 21,
        text: function () {
            return "You were wounded, but in time you fully recovered.";
        }
    },
    {
        roll: 31,
        text: function () {
            return "You contracted a disease while exploring a filthy warren. You recovered from the disease but you have " + 
            option(["a persistent cough.", "pickmarks on your skin.", "prematurely gray hair."]);
        }
    },
    {
        roll: 41,
        text: function () {
            return "You were poisoned by a trap or a monster. You recovered, but the next time you must make a saving throw against poison, you make the saving throw with disadvantage.";
        }
    },
    {
        roll: 51,
        text: function () {
            return "You lost something of sentimental value during your adventure. Remove one trinket from your posessions.";
        }
    },
    {
        roll: 61,
        text: function () {
            return "You were terribly frightened by something you encountered and ran away, abandoning your companions to their fate.";
        }
    },
    {
        roll: 71,
        text: function () {
            return "You learned a great deal during your adventure. The next time you make an ability check or a saving throw you have advantage on the roll.";
        }
    },
    {
        roll: 81,
        text: function () {
            return "You found some treasure on your adventure. You have " + (d(6) + d(6)) + "gp left over from your share of it.";
        }
    },
    {
        roll: 91,
        text: function () {
            return "You found a consierable amount of treasure on your adventure. You have " + (d(20) + 50) + "gp left over from your share of it.";
        }
    },
    {
        roll: 100,
        text: function () {
            return "You came across a common magic item. (Of the dm's choice)";
        }
    }
];

var Table_ArcaneMatters = [
    {
        roll: 1,
        text: function () {
            return "You were " + option(["charmed", "frightened"]) + " by a spell.";
        }
    },
    {
        roll: 2,
        text: function () {
            return "You were injured by the effect of a spell.";
        }
    },
    {
        roll: 3,
        text: function () {
            return "You witnessed a powerful spell being cast by a " + option(["cleric.", "druid.", "sorcerer.", "warlock.", "wizard."]);
        }
    },
    {
        roll: 4,
        text: function () {
            return "You drank a potion (of the DM's choice).";
        }
    },
    {
        roll: 5,
        text: function () {
            return "You found a spell scroll (of the DM's choice) and succeeded in casting the spell it contained.";
        }
    },
    {
        roll: 6,
        text: function () {
            return "You were affected by teleportation magic.";
        }
    },
    {
        roll: 7,
        text: function () {
            return "You turned invidible for a time.";
        }
    },
    {
        roll: 8,
        text: function () {
            return "You saw a creature being conjured by magic.";
        }
    },
    {
        roll: 9,
        text: function () {
            return "Your fortune was read by a diviner. Have your DM roll on the life events table twice. They pick one event as a portent for your future.";
        }
    },
    {
        roll: 10,
        text: function () {
            return "You saw a creature being conjured by magic.";
        }
    }
];

var Table_Boons = [
    {
        roll: 1,
        text: function () {
            return "A friendly wizard gave you a spell scroll containing one cantrip (of the dm's choice)";
        }
    },
    {
        roll: 2,
        text: function () {
            return "You saved the life of a commoner, who now owes you a life debt. This individual now follows you on your travels and performs mundane tasks for you but will leave if neglected, abused, or imperriled.";
        }
    },
    {
        roll: 3,
        text: function () {
            return "You found a riding horse.";
        }
    },
    {
        roll: 4,
        text: function () {
            return "You found some money. You have " + d(20) + "gp extra in starting funds";
        }
    },
    {
        roll: 5,
        text: function () {
            return "A relative bequeathed you a simple weapon of your choice.";
        }
    },
    {
        roll: 6,
        text: function () {
            return "You found something interesting. Gain an additional trinket.";
        }
    },
    {
        roll: 7,
        text: function () {
            return "You once performed a service for a local temple. Next time you visit that temple, you recieve healing up to your hit point maximum.";
        }
    },
    {
        roll: 8,
        text: function () {
            return "A friendly alchemist gifted you with a potion of healing or a flask of acid, as you choose.";
        }
    },
    {
        roll: 9,
        text: function () {
            return "You found a treasure map.";
        }
    },
    {
        roll: 10,
        text: function () {
            return "A distant relative left you a stipend that enables you to live at the comfortable lifestyle for " + d(20) + " years. If you choose to live at a higher lifestyle, you reduce the price of the lifestyle by 2gp during that time period.";
        }
    }
];

var Table_Crime = [
    {
        roll: 1,
        text: function () {
            return "Murder";
        }
    },
    {
        roll: 2,
        text: function () {
            return "Theft";
        }
    },
    {
        roll: 3,
        text: function () {
            return "Burglary";
        }
    },
    {
        roll: 4,
        text: function () {
            return "Assault";
        }
    },
    {
        roll: 5,
        text: function () {
            return "Smuggling";
        }
    },
    {
        roll: 6,
        text: function () {
            return "Kidnapping";
        }
    },
    {
        roll: 7,
        text: function () {
            return "Extortion";
        }
    },
    {
        roll: 8,
        text: function () {
            return "Counterfeiting";
        }
    }
];

var Table_Punishment = [
    {
        roll: 1,
        text: function () {
            return "You did not commit the crime and were exonerated after being accused.";
        }
    },
    {
        roll: 4,
        text: function () {
            return "You commited the crime or helped to do so, but nonetheless the authorities found you not guilty.";
        }
    },
    {
        roll: 7,
        text: function () {
            return "You were nearly caught in the act. You had to flee and are wanted in the community where the crime occurred.";
        }
    },
    {
        roll: 9,
        text: function () {
            return "You were caught and convicted. You spent time " + option(["in jail", "chained to an oar", "performing hard labor"]) + ". You served a sentence of " +
            d(4) + " years or succeeded in escaping after that much time.";
        }
    }
];

var Table_SupernaturalEvents = [
    {
        roll: 1,
        text: function () {
            return "You were ensorcelled by a fey and enslaved for " + d(6) + " years before you escaped";
        }
    },
    {
        roll: 6,
        text: function () {
            return "You saw a demon and ran away before it could do anything";
        }
    },
    {
        roll: 11,
        text: function () {
            return "A devil tempted you. Make a DC 10 Wisdom saving throw. On a failed save your alignment shifts one step twoards evil (if not evil already), and you start the game with an additional " + (d(20)+50) + " gp";
        }
    },
    {
        roll: 16,
        text: function () {
            return "You woke up one morning miles from your home, with no idea how you " +
                "got there.";
        }
    },
    {
        roll: 21,
        text: function () {
            return "You visited a holy site and felt the presence of the divine there.";
        }
    },
    {
        roll: 31,
        text: function () {
            return "You witnessed a falling red star, a face appearing in the frost, or some other bizzarre happening. You are certain that it was an omen of some sort.";
        }
    },
    {
        roll: 41,
        text: function () {
            return "You escaped certain death and believe it was the intervention of a god that saved you.";
        }
    },
    {
        roll: 51,
        text: function () {
            return "You witnessed a minor miracle.";
        }
    },
    {
        roll: 61,
        text: function () {
            return "You explored an empty house and found it to be haunted.";
        }
    },
    {
        roll: 71,
        text: function () {
            return "You were briefly possessed by a" + option([" celestial", " devil", " demon", " fey", "n elemental", "n undead"]);
        }
    },
    {
        roll: 76,
        text: function () {
            return "You saw a ghost.";
        }
    },
    {
        roll: 81,
        text: function () {
            return "You saw a ghoul feeding on a corpse.";
        }
    },
    {
        roll: 86,
        text: function () {
            return "A celestial of a fiend visited you in your dreams to give you a warning of danger to come.";
        }
    },
    {
        roll: 91,
        text: function () {
            return "You briefly visited the Feywild or the Shadowfell.";
        }
    },
    {
        roll: 96,
        text: function () {
            return "You saw a portal that you believe leads to another plane of existence.";
        }
    }
];

var Table_Tragedies = [
    {
        roll: 1,
        text: function () {
            return option(["A family member", "A close friend"]) + " died. Cause of death: " + GetTableResult(d(12), Table_CauseOfDeath);
        }
    },
    {
        roll: 3,
        text: function () {
            return "A friendship ended bitterly, and the other person is now hostile to you. The cause might have been a misunderstanding or something you or the former friend did.";
        }
    },
    {
        roll: 4,
        text: function () {
            return "You lost all your posessions in a disaster, and had to rebuild your life.";
        }
    },
    {
        roll: 5,
        text: function () {
            return "You were imprisoned for a crime you didn't commit and spent " + d(6) + " years " + option(["in jail.", "at hard labor.", "shackled to an oar in a slave galley."]);
        }
    },
    {
        roll: 6,
        text: function () {
            return "War ravaged your home community, reducing everything to rubble and ruin. In the aftermath, you " + option(["helped your town rebuild.", "moved elsewhere."]);
        }
    },
    {
        roll: 7,
        text: function () {
            return "A lover disappeared without a trace. You have been looking for that person ever since.";
        }
    },
    {
        roll: 8,
        text: function () {
            return "A terrible blight in your home community caused crops to fail, and many starved. You lost a sibling or some other family member.";
        }
    },
    {
        roll: 9,
        text: function () {
            return "You did something that brought terrible shame to you in the eyes of your family. You might have been involved in a scandal, dabbled in dark magic, or offended someone important. The attitude of your family members twoards you becomes indifferent at best though they might forgive you.";
        }
    },
    {
        roll: 10,
        text: function () {
            return "For a reason you were never told, you were exiled from your community. You " + option(["promptly found a new place to live.", "wandered the wilderness for a while."]);
        }
    },
    {
        roll: 11,
        text: function () {
            return "A romantic relationship ended " + option(["with bad feelings.", "amicably."]);
        }
    },
    {
        roll: 12,
        text: function () {
            var causeOfDeathRoll = d(12);
            var confirmationRoll = causeOfDeathRoll == 2 ? d(12) : 12;
            var result = "A current or prospective romantic partner of yours died. Cause of death: " + GetTableResult(causeOfDeathRoll, Table_CauseOfDeath);
            if (confirmationRoll == 1)
            {
                result = result + ". You were " + option(["directly", "indirectly"]) + " responsible."
            }
            return result;
        }
    }
];

var Table_War = [
    {
        roll: 1,
        text: function() {
            return "You were knocked out and left for dead. you woke up hours later with no recollection of the battle.";
        }
    },
    {
        roll: 2,
        text: function() {
            return "You were badly injured in the fight, and you still bear the awful scars of those wounds.";
        }
    },
    {
        roll: 4,
        text: function() {
            return "You ran away from battle and still feel the shame of your cowardice.";
        }
    },
    {
        roll: 5,
        text: function() {
            return "You suffered only minor injuries, and the wounds all healed without leaving scars.";
        }
    },
    {
        roll: 8,
        text: function() {
            return "You survived the battle, but you suffer from terrible nightmares in which you relive the experience.";
        }
    },
    {
        roll: 10,
        text: function() {
            return "You escaped the battle unscathed, though many of your friends were injured or lost.";
        }
    },
    {
        roll: 12,
        text: function() {
            return "You acquitted yourself well in battle and are remembered as a hero. You might have recieved a medal for your bravery.";
        }
    }
];

var Table_WierdStuff = [
    {
        roll: 1,
        text: function() {
            return "You were turned into a toad and remained in that form for " + d(4) + " weeks.";
        }
    },
    {
        roll: 2,
        text: function() {
            return "You were petrified and remained a stone statue for a time until someone freed you.";
        }
    },
    {
        roll: 3,
        text: function() {
            return "You were enslaved by a hag, a satyr, or some other being and lived in that creature's thrall for " + d(6) + "years.";
        }
    },
    {
        roll: 4,
        text: function() {
            return "A dragon held you as a prisoner for " + d(4) + " months until adventurers killed it.";
        }
    },
    {
        roll: 5,
        text: function() {
            return "You were taken captive by " + option(["drow", "kuo-toa", "quaggoths"]) + ". You lived as a slave in the Underdark until you escaped.";
        }
    },
    {
        roll: 6,
        text: function() {
            return "You served a powerful adventurer as a hireling. You have only recently left that service.";
        }
    },
    {
        roll: 7,
        text: function() {
            return "You went insane for " + d(6) + " years and recently regained your sanity. A tic or some other odd behaviour might linger.";
        }
    },
    {
        roll: 8,
        text: function() {
            return "A lover of yours was secretly a silver dragon.";
        }
    },
    {
        roll: 9,
        text: function() {
            return "You were captured by a cult and nearly sacrificed on an altar to the fould being the cultists served. You escaped but fear they will find you.";
        }
    },
    {
        roll: 10,
        text: function() {
            return "You met " + option(["a demigod", "an archdevil", "an archfey", "a demon lord", "a titan"]) + "and lived to tell the tale.";
        }
    },
    {
        roll: 11,
        text: function() {
            return "You were swallowed by a giant fish and spent a month it its gullet before you escaped.";
        }
    },
    {
        roll: 12,
        text: function() {
            return "A powerful being granted you a wish, but you sqandered it on something frivolous.";
        }
    }
];