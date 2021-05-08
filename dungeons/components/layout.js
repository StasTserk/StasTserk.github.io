const Layout = (props) => {
    const { x, y, size, padding } = dimensions;
    return (React.createElement(React.Fragment, null,
        React.createElement(Hallways, { halls: props.halls }),
        React.createElement("div", { className: "dungeon-layout", style: {
                width: x * (size + padding) + padding,
                height: y * (size + padding) + padding,
            } }, props.rooms.map(r => { return React.createElement(Room, { room: r, key: r.id }); })),
        React.createElement(RoomDetail, { room: props.rooms[0] })));
};
const Hallways = (props) => {
    const { x, y, size, padding } = dimensions;
    return (React.createElement("svg", { style: {
            width: x * (size + padding) + padding,
            height: y * (size + padding) + padding,
        } }, props.halls.map((hall, index) => {
        return (React.createElement("polyline", { key: index, fill: "none", stroke: "black", points: hall.path.map(p => `${p.x}, ${p.y}`).join(' ') }));
    })));
};
const Room = (props) => {
    const { size, padding } = dimensions;
    const { room } = props;
    return (React.createElement("div", { className: "room", style: { top: room.location.y * (size + padding) + padding, left: room.location.x * (size + padding) + padding }, onMouseEnter: () => notify('hover', room) },
        React.createElement("strong", null, room.type),
        " - ",
        room.subtype));
};
const RoomDetail = (props) => {
    const [room, setRoom] = React.useState(props.room);
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
