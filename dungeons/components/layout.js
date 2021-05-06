var Layout = function (props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "dungeon-layout" }, props.rooms.map(function (r) { return React.createElement(Room, { room: r, key: r.id }); })),
        React.createElement(RoomDetail, { room: props.rooms[0] })));
};
var Room = function (props) {
    var room = props.room;
    return (React.createElement("div", { className: "room", style: { top: room.location.y * 110 + 10, left: room.location.x * 110 + 10 }, onMouseEnter: function () { return notify('hover', room); } },
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
