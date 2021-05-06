var Layout = function (props) {
    console.log(props);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "dungeon-layout" }, props.rooms.map(function (r) { return React.createElement(Room, { room: r, key: r.id }); }))));
};
var Room = function (props) {
    var room = props.room;
    return React.createElement("div", { className: "room", style: { top: room.location.y * 110 + 10, left: room.location.x * 110 + 10 } },
        React.createElement("strong", null, room.type),
        " - ",
        room.subtype);
};
