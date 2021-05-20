const roomTypes: { type: string, subtypes: string[] }[] = [
    {
        type: "Residential",
        subtypes: [
            "Dormitory barracks for servants",
            "The owner or ruler’s bedchamber",
            "High-ranking resident bedroom",
            "Latrine or privy",
            "Kennel or beast pen",
            "Prison or slave cages",
            "Meager room for minor servant",
            "Sickroom for patients",
            "Guest chambers for visitors",
            "Kitchen or dining hall",
            "Bathing chamber or washroom",
            "Study or private library"
        ]
    },
    {
        type: "Work",
        subtypes: [
            "Smithy or forge",
            "Smokehouse or food preparation",
            "Sewing or weaving room",
            "Torture chamber",
            "Healer’s work room",
            "Arcane laboratory",
            "Alchemist’s workshop",
            "Artisan’s work area",
            "Artist’s workroom",
            "Washroom or scullery",
            "Brewery room",
            "Processing room for a raw good"
        ]
    },
    {
        type: "Cultural",
        subtypes: [
            "Plaza or meeting area",
            "Amphitheater or recital room",
            "Art gallery",
            "Cultural monument",
            "Grave, cemetery, or ossuary",
            "Library or archive",
            "Garden or flowing water feature",
            "Ornately iconographic chamber",
            "Room for a particular cultural rite",
            "Drinking hall",
            "Performance stage or area",
            "Drug den or place of debauchery"
        ]
    },
    {
        type: "Martial",
        subtypes: [
            "Armory or martial storage",
            "Training area",
            "Barracks for soldiers",
            "Guard post",
            "Parade ground",
            "Commemorative hall",
            "Map or planning room",
            "War machine fabrication or storage",
            "Dueling area",
            "Beast-fighting arena",
            "Strong point or fortification",
            "Gate or fortified entrance"
        ]
    },
    {
        type: "Religious",
        subtypes: [
            "Private shrine",
            "Altar room",
            "Monastic prayer cell",
            "Ritual chamber",
            "Monument to a deity",
            "Ceremonial bath",
            "Room for a labor holy to the god",
            "Storage for religious equipage",
            "Secured chamber for holy relics",
            "Secret or unofficial chapel",
            "Priest’s private chambers",
            "Public area adorned with icons"
        ]
    },
    {
        type: "Utility",
        subtypes: [
            "Work materials storage",
            "Pantry or food storage",
            "Storeroom for random detritus",
            "Furnace or boiler room",
            "Exotic ancient power or light room",
            "Pool or water source room",
            "Concealed servant’s passage",
            "Domestic staff head office",
            "Vault for valuables",
            "Secret or unobtrusive entrance",
            "Grand passage or ornate corridor",
            "Barn or fodder storage"
        ]
    }
];

declare type RoomContents = { type: string, description: string, chanceOfTreasure: number };
const roomContents: RoomContents[] = [
    {
        type: "Creature",
        description: "This room is populated by some of the inhabitants of the dungeon.",
        chanceOfTreasure: 0.5
    }, {
        type: "Creature",
        description: "This room is populated by some of the inhabitants of the dungeon.",
        chanceOfTreasure: 0.5
    }, {
        type: "Hazard",
        description: "Be it traps, environments, or something else. This room is dangerous.",
        chanceOfTreasure: 0.33
    }, {
        type: "Enigma",
        description: "A magical or mechanical oddity. Some piece of the site's past or something related to its' purpose.",
        chanceOfTreasure: 0.33
    }, {
        type: "Distractor",
        description: "Objects or situations which serve to flavor the site, but are otherwise unimportant",
        chanceOfTreasure: 0.1666
    }, {
        type: "Distractor",
        description: "Objects or situations which serve to flavor the site, but are otherwise unimportant",
        chanceOfTreasure: 0.1666
    }, {
        type: "Empty",
        description: "Of no particular interest, simply a passage from one point to another",
        chanceOfTreasure: 0.1666
    }, {
        type: "Empty",
        description: "Of no particular interest, simply a passage from one point to another",
        chanceOfTreasure: 0.1666
    }
];

function RollOn<T>(table: Array<T>): T {
    return table[Math.floor(Math.random() * table.length)];
}

const pathType: "Linear" | "Curved" = "Linear";