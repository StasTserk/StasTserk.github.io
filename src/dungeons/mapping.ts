function linkRoom(
    a: RoomDescription,
    exitDirection: "N" | "W" | "E" | "S",
    b: RoomDescription,
    entryDirection: "N" | "W" | "E" | "S"): Hallway {
    
    const aCenter: Point = {
        x: a.location.x * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
        y: a.location.y * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
    }
    
    const bCenter: Point = {
        x: b.location.x * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
        y: b.location.y * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
    }
    const aDrift = ((Math.random() - 0.5) * dimensions.size / 2)
    const aStub = getHallStub(aCenter, exitDirection, aDrift);
    const bDrift = ((Math.random()-0.5) * dimensions.size / 2)
    const bStub = getHallStub(bCenter, entryDirection, bDrift);

    const aCorner = getNearestCorner(aStub[1], exitDirection, bCenter);
    const bCorner = getNearestCorner(bStub[1], entryDirection, aCenter);
    
    return {
        start: { x: aCenter.x, y: aCenter.y, direction: exitDirection },
        end: { x: bCenter.x, y: bCenter.y, direction: entryDirection },
        path: [
            aCenter,
            ...aStub,
            aCorner,
            { x: aCorner.x, y: bCorner.y },
            bCorner,
            ...bStub.reverse(),
            bCenter]
    };
}

function getNearestCorner(start: Point, dir: Direction, hint: Point) {
    const { size, padding } = dimensions;
    const gridSize = size + padding;

    switch (dir) {
        case "N": case "S":
            // we have to go either east or west
            const relevantDimension = start.x;
            const nearestEast = Math.ceil(relevantDimension / gridSize) * gridSize + padding / 2;
            const nearestWest = Math.floor(relevantDimension / gridSize) * gridSize + padding / 2;
            if (relevantDimension > hint.x) {
                return {
                    x: nearestWest,
                    y: start.y
                };
            }
            return {
                x: nearestEast,
                y: start.y
            };
        default:
            // we have to go north or south
            const relevantDim = start.y;
            const nearestSouth = Math.ceil(relevantDim / gridSize) * gridSize + padding / 2;
            const nearestNorth = Math.floor(relevantDim / gridSize) * gridSize + padding / 2;
            if (relevantDim > hint.y) {
                return {
                    x: start.x,
                    y: nearestNorth
                };
            }
            return {
                x: start.x,
                y: nearestSouth
            };
    }
}

function getHallStub(p: Point, d: Direction, jitter: number = 0): Point[] {
    const { size, padding } = dimensions;
    let edgePoint;
    let nextPoint;
    switch (d) {
        case 'E':
            edgePoint = north(east(p, (size / 2)), jitter);
            nextPoint = east(edgePoint, padding / 2);
            break;
        case 'W':
            edgePoint = north(west(p, (size / 2)), jitter);
            nextPoint = west(edgePoint, padding / 2);
            break;
        case 'N':
            edgePoint = west(north(p, (size / 2)), jitter);
            nextPoint = north(edgePoint, padding / 2);
            break;
        case 'S':
            edgePoint = west(south(p, (size / 2)), jitter);
            nextPoint = south(edgePoint, padding / 2);
            break;
    }
    return [edgePoint, nextPoint];
}


declare type RoomDescription = {
    id?: string,
    type: string,
    subtype: string,
    numExits: number;
    location: { x: number, y: number };
};

const dimensions = {
    x: 5,
    y: 5,
    padding: 40,
    size: 100,
}

const directions: ("N" | "W" | "E" | "S")[] = ["N", "W", "E", "S"];
function randomDirection() {
    return directions[Math.floor(Math.random() * directions.length)];
}

function getRoomDescription(): RoomDescription {
    const { x, y } = dimensions;
    const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const subtype = type.subtypes[Math.floor(Math.random() * type.subtypes.length)];
    return {
        type: type.type,
        subtype,
        numExits: Math.floor(Math.random() * 4) + 1,
        location: {
            x: Math.floor(Math.random() * x),
            y: Math.floor(Math.random() * y)
        }
    };
}

declare type Point = { x: number, y: number };

function north(p: Point, amount: number): Point {
    return {
        x: p.x,
        y: p.y - amount
    };
}
function south(p: Point, amount: number): Point {
    return north(p, -amount);
}

function east(p: Point, amount: number): Point {
    return {
        x: p.x + amount,
        y: p.y 
    };
}
function west(p: Point, amount: number): Point {
    return east(p, -amount);
}

declare type Direction = "N" | "W" | "E" | "S";

declare type Hallway = {
    start: Point & { direction: Direction },
    end: Point & { direction: Direction },
    path: Point[];
}
