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
    for (var i = 0; i < table.length; i ++) {
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
        npc.attitude + " towards you. They are " +
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

    this.backgroundReason = "";
    this.classReason = "";

    this.childhoodText = [];
    this.events = [];
    this.knownNpcs = [];
    this.hasWife = false;
    // generate childhood
    this.GenerateChildhood();
    this.GenerateChoiceReasons();
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
        this.childhoodText.push("you had " + option([d(3), d(4)+1, d(6)+2, d(8)+3]) + " siblings. Your birth order was: " + GetTableResult(d(6)+d(6), Table_BirthOrder))
    } else {
        this.childhoodText.push("you were an only child")
    }

    // family
    var familyRoll = d(100);
    this.childhoodText.push("you were raised " + GetTableResult(familyRoll, Table_Family));

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
    this.childhoodText.push("you grew up " + GetTableResult(d(100) + homeModifier, Table_ChildhoodHome));
    
    // childhood memories
    this.childhoodText.push(GetTableResult(this.chaMod + d(6)+d(6)+d(6), Table_ChildhoodMemories));
};

Backstory.prototype.GenerateLifeEvent = function() {
    var eventRoll = d(100);
    var eventText = GetTableResult(eventRoll, Table_LifeEvents);

    if (eventRoll < 11) {
        // tragedy
        var tragedyRoll = d(12);
        eventText += " " + GetTableResult(tragedyRoll, Table_Tragedies);

        if (tragedyRoll == 9) {
            for ( var i = 0; i < this.knownNpcs.length; i ++) {
                if (this.knownNpcs[i].relationship == "Parent") {
                    this.knownNpcs[i].attitude = option(["Indifferent", "Hostile"]);
                }
            }
        }
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
        var loveNpc;
        if (this.hasWife && coin()) {
            // have a child instead of a wive
            loveNpc = GenerateNpc({ attitude: "Friendly", relationship: "Child", race: this.race });
            eventText = "You had a child with one of your love interests. They may grow up to be a";
        } else {
            loveNpc = GenerateNpc({ attitude: "Friendly", relationship: "Love" });
        }
        this.hasWife = true;

        eventText += " " + GetSimpleNpcText(loveNpc) + ""; 
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
        eventText += " " + importantNpc.SimpleDescription();
        this.knownNpcs.push(importantNpc);
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
        eventText = "you were accused of " + GetTableResult(d(8), Table_Crime) + " - " + GetTableResult(d(4), Table_Punishment);
    } else if (eventRoll < 100) {
        // encountered something magical
        eventText += " " + GetTableResult(d(10), Table_ArcaneMatters);
    } else {
        // something truly strange happened
        eventText += " " + GetTableResult(d(12), Table_WierdStuff);
    }
    this.events.push({ id: this.events.length, text: eventText });
}

Backstory.prototype.GenerateChoiceReasons = function () {
    this.classReason = "You became a " + this.class + " because ";
    switch (this.class) {
        case "Barbarian":
            this.classReason += option([
                "your devotion to your people lifted you in battle, making you powerful and dangerous.",
                "the spirits of your ancestors called on you to carry out a great task.",
                "you lost control in battle one day, and it was as if something else was manipulating your body, forcing it to kill every foe you could reach.",
                "you went on a spiritual journey to find yourself and instead found a spirit animal to guide, protect, and inspire you.",
                "you were struck by lightning and lived. Afterward, you found a new strength within you that let you push beyond your limitations.",
                "your anger needed to be channeled into battle, or you risked becoming an indiscriminate killer.",
            ]);
        break;
        case "Bard":
            this.classReason += option([
                "you awakened your latent bardic abilities through trial and error.",
                "you were a gifted performer and attracted the attention of a master bard who schooled you in the old techniques.",
                "you joined a loose society of scholars and orators to learn new techniques of performance and magic.",
                "you felt a calling to recount the deeds of champions and heroes, to bring them alive in song and story.",
                "you joined one of the great colleges to learn old lore, the secrets of magic, and the art of performance.",
                "you picked up a musical instrument one day and instantly discovered that you could play it.",
            ]);
        break;
        case "Cleric":
            this.classReason += option([
                "a supernatural being in service to the gods called you to become a divine agent in the world.",
                "you saw the injustice and horror in the world and felt moved to take a stand against them.",
                "your god gave you an unmistakable sign. you dropped everything to serve the divine.",
                "although you were always devout, it wasn’t until you completed a pilgrimage that you knew your true calling.",
                "you used to serve in your religion’s bureaucracy but found you needed to work in the world, to bring the message of your faith to the darkest corners of the land.",
                "you realize that your god works through you, and you do as commanded, even though you don’t know why you were chosen to serve.",
            ]);
        break;
        case "Druid":
            this.classReason += option([
                "you saw too much devastation in the wild places, too much of nature’s splendor ruined by the despoilers. you joined a circle of druids to fight back against the enemies of nature.",
                "you found a place among a group of druids after you fled a catastrophe.",
                "you have always had an affinity for animals, so you explored your talent to see how you could best use it.",
                "you befriended a druid and was moved by druidic teachings. you decided to follow your friend’s guidance and give something back to the world.",
                "while you were growing up, you saw spirits all around you — entities no one else could perceive. you sought out the druids to help you understand the visions and communicate with these beings.",
                "you have always felt disgust for creatures of unnatural origin. For this reason, you immersed yourself in the study of the druidic yoursteries and became a champion of the natural order.",
            ]);
        break;
        case "Fighter":
            this.classReason += option([
                "you wanted to hone your combat skills, and so you joined a war college.",
                "you squired for a knight who taught you how to fight, care for a steed, and conduct yourself with honor. you decided to take up that path for yourself.",
                "horrible monsters descended on your community, killing someone you loved. you took up arms to destroy those creatures and others of a similar nature.",
                "you joined the army and learned how to fight as part of a group.",
                "you grew up fighting, and you refined your talents by defending yourself against people who crossed you.",
                "you could always pick up just about any weapon and know how to use it effectively.",
            ]);
        break;
        case "Monk":
            this.classReason += option([
                "you were chosen to study at a secluded monastery. There, you were taught the fundamental techniques required to eventually master a tradition.",
                "you sought instruction to gain a deeper understanding of existence and your place in the world.",
                "you stumbled into a portal to the Shadowfell and took refuge in a strange monastery, where you learned how to defend yourself against the forces of darkness.",
                "you were overwhelmed with grief after losing someone close to you, and you sought the advice of philosophers to help you cope with your loss.",
                "you could feel that a special sort of power lay within you, so you sought out those who could help you call it forth and master it.",
                "you were wild and undisciplined as a youngster, but then you realized the error of your ways. you applied to a monastery and became a monk as a way to live a life of discipline.",
            ]);
        break;
        case "Paladin":
            this.classReason += option([
                "a fantastical being appeared before you and called on you to undertake a holy quest.",
                "one of your ancestors left a holy quest unfulfilled, so you intend to finish that work.",
                "the world is a dark and terrible place. you decided to serve as a beacon of light shining out against the gathering shadows.",
                "you served as a paladin’s squire, learning all you needed to swear your own sacred oath.",
                "evil must be opposed on all fronts. you feel compelled to seek out wickedness and purge it from the world.",
                "becoming a paladin was a natural consequence of your unwavering faith. In taking your vows, you became the holy sword of your religion.",
            ]);
        break;
        case "Ranger":
            this.classReason += option([
                "you found purpose while you honed your hunting skills by bringing down dangerous animals at the edge of civilization.",
                "you always had a way with animals, able to calm them with a soothing word and a touch.",
                "you suffer from terrible wanderlust, so being a ranger gave you a reason not to remain in one place for too long.",
                "you have seen what happens when the monsters come out from the dark. you took it upon yourself to become the first line of defense against the evils that lie beyond civilization’s borders.",
                "you met a grizzled ranger who taught you woodcraft and the secrets of the wild lands.",
                "you served in an army, learning the precepts of your profession while blazing trails and scouting enemy encampments.",
            ]);
        break;
        case "Rogue":
            this.classReason += option([
                "you’ve always been nimble and quick of wit, so you decided to use those talents to help you make your way in the world.",
                "an assassin or a thief wronged you, so you focused your training on mastering the skills of your enemy to better combat foes of that sort.",
                "an experienced rogue saw something in you and taught you several useful tricks.",
                "you decided to turn your natural lucky streak into the basis of a career, though you still realize that improving your skills is essential.",
                "you took up with a group of ruffians who showed you how to get what you want through sneakiness rather than direct confrontation.",
                "you're a sucker for a shiny bauble or a sack of coins, as long as you can get your hands on it without risking life and limb.",
            ]);
        break;
        case "Sorcerer":
            this.classReason += option([
                "when you were born, all the water in the house froze solid, the milk spoiled, or all the iron turned to copper. your family is convinced that this event was a harbinger of stranger things to come for you.",
                "you suffered a terrible emotional or physical strain, which brought forth your latent magical power. you have fought to control it ever since.",
                "your immediate family never spoke of your ancestors, and when you asked, they would change the subject. It wasn’t until you started displaying strange talents that the full truth of your heritage came out.",
                "when a monster threatened one of your friends, you became filled with anxiety. you lashed out instinctively and blasted the wretched thing with a force that came from within you.",
                "sensing something special in you, a stranger taught you how to control your gift.",
                "after you escaped from a magical conflagration, you realized that though you were unharmed, you were not unchanged. you began to exhibit unusual abilities that you am just beginning to understand.",
            ]);
        break;
        case "Warlock":
            this.classReason += option([
                "while wandering around in a forbidden place, you encountered an otherworldly being that offered to enter into a pact with you.",
                "you were examining a strange tome you found in an abandoned library when the entity that would become your patron suddenly appeared before you.",
                "you stumbled into the clutches of your patron after you accidentally stepped through a magical doorway.",
                "when you were faced with a terrible crisis, you prayed to any being who would listen, and the creature that answered became your patron.",
                "your future patron visited you in your dreams and offered great power in exchange for your service.",
                "one of your ancestors had a pact with your patron, so that entity was determined to bind you to the same agreement.",
            ]);
        break;
        case "Wizard":
            this.classReason += option([
                "an old wizard chose you from among several candidates to serve an apprenticeship.",
                "when you became lost in a forest, a hedge wizard found you, took you in, and taught you the rudiments of magic",
                "you grew up listening to tales of great wizards and knew you wanted to follow their path. you strove to be accepted at an academy of magic and succeeded.",
                "one of your relatives was an accomplished wizard who decided you were smart enough to learn the craft.",
                "while exploring an old tomb, library, or temple, you found a spellbook. you were immediately driven to learn all you could about becoming a wizard.",
                "you were a prodigy who demonstrated mastery of the arcane arts at an early age. When you became old enough to set out on your own, you did so to learn more magic and expand your power.",
            ]);
        break;
        default:
            this.classReason = "Somehow you managed to pick a class wrong...";
    }

    switch (this.profession) {
        case "Acolyte":
            this.backgroundReason = "You became an acolyte because " + option([
                "you ran away from home at an early age and found refuge in a temple.",
                "your family gave you to a temple, since they were unable or unwilling to care for you.",
                "you grew up in a household with strong religious convictions. Entering the service of one or more gods seemed natural.",
                "an impassioned sermon struck a chord deep in your soul and moved you to serve the faith.",
                "you followed a childhood friend, a respected acquaintance, or someone you loved into religious service.",
                "After encountering a true servant of the gods, you were so inspired that you immediately entered the service of a religious group.",
            ]);
        break;
        case "Charlatan":
            this.backgroundReason = "You became a charlatan because " + option([
                "you were left to your own devices, and your knack for manipulating others helped you survive.",
                "you learned early on that people are gullible and easy to exploit.",
                "you often got in trouble, but you managed to talk your way out of it every time.",
                "you took up with a confidence artist, from whom you learned your craft.",
                "After a charlatan fleeced your family, you decided to learn the trade so you would never be fooled by such deception again.",
                "you were poor or you feared becoming poor, so you learned the tricks you needed to keep yourself out of poverty.",
            ]);
        break;
        case "Criminal":
            this.backgroundReason = "You became a criminal because " + option([
                "you resented authority in your younger days and saw a life of crime as the best way to fight against tyranny and oppression.",
                "necessity forced you to take up the life, since it was the only way you could survive.",
                "you fell in with a gang of reprobates and ne’er-do-wells, and you learned your specialty from them.",
                "A parent or relative taught you your criminal specialty to prepare you for the family business.",
                "you left home and found a place in a thieves’ guild or some other criminal organization.",
                "you were always bored, so you turned to crime to pass the time and discovered you were quite good at it.",
            ]);
        break;
        case "Entertainer":
            this.backgroundReason = "You became an entertainer because " + option([
                "Members of your family made ends meet by performing, so it was fitting for you to follow their example.",
                "you always had a keen insight into other people, enough so that you could make them laugh or cry with your stories or songs.",
                "you ran away from home to follow a minstrel troupe",
                "you saw a bard perform once, and you knew from that moment on what you were born to do.",
                "you earned coin by performing on street corners and eventually made a name for yourself.",
                "A traveling entertainer took you in and taught you the trade.",
            ]);
        break;
        case "Folk Hero":
            this.backgroundReason = "You became a folk hero because " + option([
                "you learned what was right and wrong from your family.",
                "you were always enamored by tales of heroes and wished you could be something more than ordinary.",
                "you hated your mundane life, so when it was time for someone to step up and do the right thing, you took your chance.",
                "a parent or one of your relatives was an adventurer, and you were inspired by that person’s courage.",
                "a mad old hermit spoke a prophecy when you were born, saying that you would accomplish great things.",
                "you have always stood up for those who are weaker than you am.",
            ]);
        break;
        case "Guild Artisan":
            this.backgroundReason = "You became a guild artisan because " + option([
                "you were apprenticed to a master who taught you the guild’s business.",
                "you helped a guild artisan keep a secret or complete a task, and in return you were taken on as an apprentice.",
                "one of your family members who belonged to the guild made a place for you.",
                "you were always good with your hands, so you took the opportunity to learn a trade.",
                "you wanted to get away from your home situation and start a new life.",
                "you learned the essentials of your craft from a mentor but had to join the guild to finish your training.",
            ]);
        break;
        case "Hermit":
            this.backgroundReason = "You became a hermit because " + option([
                "your enemies ruined your reputation, and you fled to the wilds to avoid further disparagement.",
                "you am comfortable with being isolated, as you seek inner peace.",
                "you never liked the people you called your friends, so it was easy for you to strike out on your own.",
                "you felt compelled to forsake your past, but did so with great reluctance, and sometimes you regret making that decision.",
                "you lost everything — your home, your family, your friends. Going it alone was all you could do.",
                "society’s decadence disgusted you, so you decided to leave it behind.",
            ]);
        break;
        case "Noble":
            this.backgroundReason = option([
                "You come from an old and storied family, and it fell to you to preserve the family name.",
                "Your family has been disgraced, and you intend to clear our name.",
                "Your family recently came by its title, and that elevation thrust us into a new and strange world.",
                "Your family has a title, but none of your ancestors have distinguished themselves since we gained it.",
                "Your family is filled with remarkable people. you hope to live up to their example.",
                "You hope to increase your family’s power and influence.",
            ]);
        break;
        case "Outlander":
            this.backgroundReason = "You became an outlander because " + option([
                "you spent a lot of time in the wilderness as a youngster, and you came to love that way of life.",
                "from a young age, you couldn’t abide the stink of the cities and preferred to spend your time in nature.",
                "you came to understand the darkness that lurks in the wilds, and you vowed to combat it.",
                "your people lived on the edges of civilization, and you learned the methods of survival from your family.",
                "after a tragedy you retreated to the wilderness, leaving your old life behind.",
                "your family moved away from civilization, and you learned to adapt to your new environment.",
            ]);
        break;
        case "Sage":
            this.backgroundReason = "You became a sage because " + option([
                "you were naturally curious, so you packed up and went to a university to learn more about the world.",
                "your mentor’s teachings opened your mind to new possibilities in that field of study.",
                "you were always an avid reader, and you learned much about your favorite topic on your own.",
                "you discovered an old library and pored over the texts you found there. That experience awakened a hunger for more knowledge.",
                "you impressed a wizard who told you you were squandering your talents and should seek out an education to take advantage of your gifts.",
                "one of your parents or a relative gave you a basic education that whetted your appetite, and you left home to build on what you had learned.",
            ]);
        break;
        case "Sailor":
            this.backgroundReason = "You became an sailor because " + option([
                "you were press-ganged by pirates and forced to serve on their ship until you finally escaped.",
                "you wanted to see the world, so you signed on as a deckhand for a merchant ship.",
                "one of your relatives was a sailor who took you to sea.",
                "you needed to escape your community quickly, so you stowed away on a ship. When the crew found you, you were forced to work for your passage.",
                "reavers attacked your community, so you found refuge on a ship until you could seek vengeance.",
                "you had few prospects where you were living, so you left to find your fortune elsewhere.",
            ]);
        break;
        case "Soldier":
            this.backgroundReason = "You became a soldier because " + option([
                "you joined the militia to help protect your community from monsters.",
                "a relative of yours was a soldier, and you wanted to carry on the family tradition.",
                "the local lord forced you to enlist in the army.",
                "war ravaged your homeland while you were growing up. Fighting was the only life you ever knew.",
                "you wanted fame and fortune, so you joined a mercenary company, selling your sword to the highest bidder.",
                "invaders attacked your homeland. It was your duty to take up arms in defense of your people.",
            ]);
        break;
        case "Urchin":
            this.backgroundReason = "You became an urchin because " + option([
                "wanderlust caused you to leave your family to see the world. you look after yourself.",
                "you ran away from a bad situation at home and made your own way in the world.",
                "monsters wiped out your village, and you were the sole survivor. you had to find a way to survive.",
                "a notorious thief looked after you and other orphans, and you spied and stole to earn your keep.",
                "one day you woke up on the streets, alone and hungry, with no memory of your early childhood.",
                "your parents died, leaving no one to look after you. you raised yourself.",
            ]);
        break;
        default:
            this.backgroundReason = "You became nothing because you somehow picked a background wrong: " + this.profession;
    }
}

var bs = new Backstory();