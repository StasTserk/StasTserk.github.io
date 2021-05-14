const rooms: RoomDescription[] = [
];

const bounds = { minX: 999, minY: 999, maxX: 0, maxY: 0 }

const halls: Hallway[] = [];

declare interface Math {
    seedrandom(seed: string);
}

function GenerateDungeon(seed: string) {
    Math.seedrandom(seed);
    rooms.push({ ...getRoomDescription(), id: "1" })
    let i = 0;
    while (i < rooms.length && rooms.length < 10) {
        
        const room = rooms[i];
        

        for (let j = room.halls.length; j < room.numExits; j++) {
            const direction = randomDirection();
            const newLocation = findEmptySpot(room.location, direction);
            const newRoom = { ...getRoomDescription(newLocation), id: (rooms.length + 1 ).toString() }
            const hall = linkRoom(room, direction, newRoom, oppositeDirection(direction));
            hall.startRoom = room;
            hall.endRoom = newRoom;
            room.halls.push(hall);
            newRoom.halls.push(hall);
            updateBounds(newRoom);
            halls.push(hall);
            rooms.push(newRoom);
        }

        i++;
    }

    // normalize coordinates to 0;
    const deltaX = bounds.minX;
    const hallDeltaX = deltaX * (dimensions.size + dimensions.padding);
    const deltaY = bounds.minY;
    const hallDeltaY = deltaY * (dimensions.size + dimensions.padding);
    bounds.maxX -= deltaX - 1;
    bounds.maxY -= deltaY - 1;
    rooms.forEach(r => {
        r.location.x -= deltaX;
        r.location.y -= deltaY;
    });
    halls.forEach(h => {
        h.path.forEach(p => {
            p.x -= hallDeltaX;
            p.y -= hallDeltaY;
        });
        if (!rooms.some(r => roomIsBetween(r, h.startRoom, h.endRoom))) {
            simplifyPath(h);
        }
    });
    dimensions.x = bounds.maxX;
    dimensions.y = bounds.maxY;
}

function findEmptySpot(point: Point, direction: Direction): Point {
    const x = Math.floor(Math.random() * 0)+1;
    const y = Math.floor(Math.random() * 0)+1;
    const multiplier = { x: 0, y: 0 }
    switch (direction) {
        case "W": multiplier.x = -1; break;
        case "E": multiplier.x = 1; break;
        case "N": multiplier.y = -1; break;
        case "S": multiplier.y = 1; break;
    }
    const offset: Point = { x: x * multiplier.x, y: y * multiplier.y };
    let newSpace = addPoints(point, offset);
    while (rooms.some(r => sameSpot(r.location, newSpace))) {
        newSpace = addPoints(newSpace, offset);
    }
    return newSpace;
}

function addPoints(...points: Point[]): Point {
    return points.reduce((a, v) => { return { x: a.x + v.x, y: a.y + v.y }; }, { x: 0, y: 0 });
}

function sameSpot(a: Point, b: Point) {
    return a.x === b.x && a.y === b.y;
}

function updateBounds(room: RoomDescription): void {
    bounds.minX = Math.min(room.location.x, bounds.minX);
    bounds.minY = Math.min(room.location.y, bounds.minY);
    bounds.maxX = Math.max(room.location.x, bounds.maxX);
    bounds.maxY = Math.max(room.location.y, bounds.maxY);
}