var Layout = function (props) {
    var x = dimensions.x, y = dimensions.y, size = dimensions.size, padding = dimensions.padding;
    return (React.createElement(React.Fragment, null,
        React.createElement(Hallways, { halls: props.halls }),
        React.createElement("div", { className: "dungeon-layout", style: {
                width: x * (size + padding) + padding,
                height: y * (size + padding) + padding
            } }, props.rooms.map(function (r) { return React.createElement(Room, { room: r, key: r.id }); })),
        React.createElement(RoomDetail, { room: props.rooms[0] })));
};
var Hallways = function (props) {
    var x = dimensions.x, y = dimensions.y, size = dimensions.size, padding = dimensions.padding;
    return (React.createElement("svg", { style: {
            width: x * (size + padding) + padding,
            height: y * (size + padding) + padding
        } }, props.halls.map(function (hall, index) {
        return (React.createElement("polyline", { key: index, fill: "none", stroke: "black", points: hall.path.map(function (p) { return p.x + ", " + p.y; }).join(' ') }));
    })));
};
var Room = function (props) {
    var size = dimensions.size, padding = dimensions.padding;
    var room = props.room;
    return (React.createElement("div", { className: "room", style: { top: room.location.y * (size + padding) + padding, left: room.location.x * (size + padding) + padding }, onMouseEnter: function () { return notify('hover', room); } },
        React.createElement("strong", null, room.type),
        " - ",
        room.subtype));
};
var RoomDetail = function (props) {
    var _a = React.useState(props.room), room = _a[0], setRoom = _a[1];
    subscribe("hover", setRoom);
    return (React.createElement("div", { className: "room-detail" },
        React.createElement("div", { className: "description" },
            room.type,
            " - ",
            room.subtype),
        React.createElement("p", null,
            "Number of Exits: ",
            room.numExits)));
};
