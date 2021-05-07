var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function linkRoom(a, exitDirection, b, entryDirection) {
    var aCenter = {
        x: a.location.x * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
        y: a.location.y * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2)
    };
    var bCenter = {
        x: b.location.x * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2),
        y: b.location.y * (dimensions.size + dimensions.padding) + dimensions.padding + (dimensions.size / 2)
    };
    var aDrift = ((Math.random() - 0.5) * dimensions.size / 2);
    var aStub = getHallStub(aCenter, exitDirection, aDrift);
    var bDrift = ((Math.random() - 0.5) * dimensions.size / 2);
    var bStub = getHallStub(bCenter, entryDirection, bDrift);
    var aCorner = getNearestCorner(aStub[1], exitDirection, bCenter);
    var bCorner = getNearestCorner(bStub[1], entryDirection, aCenter);
    return {
        start: { x: aCenter.x, y: aCenter.y, direction: exitDirection },
        end: { x: bCenter.x, y: bCenter.y, direction: entryDirection },
        path: __spreadArray(__spreadArray(__spreadArray(__spreadArray([
            aCenter
        ], aStub), [
            aCorner,
            { x: aCorner.x, y: bCorner.y },
            bCorner
        ]), bStub.reverse()), [
            bCenter
        ])
    };
}
function getNearestCorner(start, dir, hint) {
    var size = dimensions.size, padding = dimensions.padding;
    var gridSize = size + padding;
    switch (dir) {
        case "N":
        case "S":
            // we have to go either east or west
            var relevantDimension = start.x;
            var nearestEast = Math.ceil(relevantDimension / gridSize) * gridSize + padding / 2;
            var nearestWest = Math.floor(relevantDimension / gridSize) * gridSize + padding / 2;
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
            var relevantDim = start.y;
            var nearestSouth = Math.ceil(relevantDim / gridSize) * gridSize + padding / 2;
            var nearestNorth = Math.floor(relevantDim / gridSize) * gridSize + padding / 2;
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
function getHallStub(p, d, jitter) {
    if (jitter === void 0) { jitter = 0; }
    var size = dimensions.size, padding = dimensions.padding;
    var edgePoint;
    var nextPoint;
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
var dimensions = {
    x: 5,
    y: 5,
    padding: 40,
    size: 100
};
var directions = ["N", "W", "E", "S"];
function randomDirection() {
    return directions[Math.floor(Math.random() * directions.length)];
}
function getRoomDescription() {
    var x = dimensions.x, y = dimensions.y;
    var type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    var subtype = type.subtypes[Math.floor(Math.random() * type.subtypes.length)];
    return {
        type: type.type,
        subtype: subtype,
        numExits: Math.floor(Math.random() * 4) + 1,
        location: {
            x: Math.floor(Math.random() * x),
            y: Math.floor(Math.random() * y)
        }
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
