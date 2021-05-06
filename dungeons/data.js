var roomTypes = [
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
    }
];
function getRoomDescription() {
    var type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    var subtype = type.subtypes[Math.floor(Math.random() * type.subtypes.length)];
    return {
        type: type.type,
        subtype: subtype,
        numExits: Math.floor(Math.random() * 4) + 1,
        location: {
            x: Math.floor(Math.random() * 5),
            y: Math.floor(Math.random() * 5)
        }
    };
}
