function linkRoom(a, exitDirection, b, entryDirection) {
    const aCenter = {
        x: a.location.x * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
        y: a.location.y * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
    };
    const bCenter = {
        x: b.location.x * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
        y: b.location.y * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
    };
    const aStub = getHallStub(aCenter, exitDirection, jitter(dimensions.size * .75));
    const bStub = getHallStub(bCenter, entryDirection, jitter(dimensions.size * .75));
    const aCorner = getNearestCorner(aStub[1], exitDirection, bStub[1]);
    const bCorner = getNearestCorner(bStub[1], entryDirection, aCorner);
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
            bCenter
        ]
    };
}
function getNearestCorner(start, dir, hint) {
    const { size, padding } = dimensions;
    const gridSize = size + padding;
    const drift = jitter(padding / 2);
    switch (dir) {
        case "N":
        case "S":
            // we have to go either east or west
            const relevantDimension = start.x;
            const nearestEast = Math.ceil(relevantDimension / gridSize) * gridSize + padding / 2;
            const nearestWest = Math.floor(relevantDimension / gridSize) * gridSize + padding / 2;
            if (relevantDimension > hint.x) {
                return {
                    x: nearestWest + drift,
                    y: start.y
                };
            }
            return {
                x: nearestEast + drift,
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
                    y: nearestNorth + drift
                };
            }
            return {
                x: start.x,
                y: nearestSouth + drift
            };
    }
}
function quadratize(path) {
    const pathString = [`M ${path[0].x} ${path[0].y}`];
    for (let i = 1; i < path.length - 1; i++) {
        const pt1 = path[i];
        const pt2 = path[i + 1];
        if (distanceBetween(pt1, pt2) < 25) {
            continue;
        }
        const midway = { x: (pt1.x + pt2.x) / 2, y: (pt1.y + pt2.y) / 2 };
        pathString.push(`Q ${pt1.x} ${pt1.y}, ${midway.x} ${midway.y}`);
    }
    const endPoint = path[path.length - 1];
    pathString.push(`L ${endPoint.x} ${endPoint.y}`);
    return pathString.join(' ');
}
function distanceBetween(a, b) {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}
function getHallStub(p, d, drift = 0) {
    const { size, padding } = dimensions;
    let edgePoint;
    let nextPoint;
    switch (d) {
        case 'E':
            edgePoint = north(east(p, (size / 2)), drift);
            nextPoint = east(edgePoint, padding / 2 + jitter(0));
            break;
        case 'W':
            edgePoint = north(west(p, (size / 2)), drift);
            nextPoint = west(edgePoint, padding / 2 + jitter(0));
            break;
        case 'N':
            edgePoint = west(north(p, (size / 2)), drift);
            nextPoint = north(edgePoint, padding / 2 + jitter(0));
            break;
        case 'S':
            edgePoint = west(south(p, (size / 2)), drift);
            nextPoint = south(edgePoint, padding / 2 + jitter(0));
            break;
    }
    return [edgePoint, nextPoint];
}
function roomIsBetween(room, a, b) {
    if (room === a || room === b) {
        return false;
    }
    const minX = Math.min(a.location.x, b.location.x);
    const maxX = Math.max(a.location.x, b.location.x);
    const minY = Math.min(a.location.y, b.location.y);
    const maxY = Math.max(a.location.y, b.location.y);
    const { x, y } = room.location;
    return (x >= minX && x <= maxX && y >= minY && y <= maxY);
}
function simplifyPath(hall) {
    hall.path.splice(1, 7);
}
const dimensions = {
    x: 5,
    y: 5,
    padding: 50,
    size: 100,
};
const directions = ["N", "W", "E", "S"];
function randomDirection() {
    return directions[Math.floor(Math.random() * directions.length)];
}
function oppositeDirection(dir) {
    switch (dir) {
        case "N": return "S";
        case "W": return "E";
        case "S": return "N";
        case "E": return "W";
    }
}
function getRoomDescription(location = { x: 0, y: 0 }) {
    const type = RollOn(roomTypes);
    const subtype = RollOn(type.subtypes);
    const contents = RollOn(roomContents);
    return {
        type: type.type,
        subtype,
        numExits: Math.floor(Math.random() * 4) + 1,
        location,
        contents: {
            type: contents.type,
            description: contents.description,
            treasure: (Math.random() <= contents.chanceOfTreasure)
        },
        halls: []
    };
}
function north(p, amount) {
    return {
        x: p.x,
        y: p.y - amount
    };
}
function south(p, amount) {
    return north(p, -amount);
}
function east(p, amount) {
    return {
        x: p.x + amount,
        y: p.y
    };
}
function west(p, amount) {
    return east(p, -amount);
}
function jitter(magnitude) {
    return (Math.random() - 0.5) * magnitude;
}
