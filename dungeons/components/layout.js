const Layout = (props) => {
    const { x, y, size, padding } = dimensions;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "dungeon-map" },
            React.createElement(Hallways, { halls: props.halls }),
            React.createElement("div", { className: "dungeon-layout", style: {
                    width: x * (size + padding) + padding,
                    height: y * (size + padding) + padding,
                } }, props.rooms.map(r => { return React.createElement(Room, { room: r, key: r.id }); }))),
        React.createElement(RoomDetail, { room: props.rooms[0] })));
};
const Hallways = (props) => {
    const { x, y, size, padding } = dimensions;
    return (React.createElement("svg", { style: {
            width: x * (size + padding) + padding,
            height: y * (size + padding) + padding,
        } }, props.halls.map((hall) => {
        return React.createElement(Hall, { hall: hall, key: hall.id });
    })));
};
const Hall = (props) => {
    const [active, setActive] = React.useState(false);
    React.useEffect(() => {
        subscribe(`hall${props.hall.id}`, (state) => {
            setActive(state);
        });
    }, []);
    return (React.createElement("polyline", { key: props.hall.id, fill: "none", stroke: active ? "gold" : "black", points: props.hall.path.map(p => `${p.x}, ${p.y}`).join(' '), strokeWidth: 3 }));
};
const Room = (props) => {
    const { size, padding } = dimensions;
    const { room } = props;
    return (React.createElement("div", { className: "room", style: { top: room.location.y * (size + padding) + padding, left: room.location.x * (size + padding) + padding }, onMouseEnter: () => {
            notify('hover', room);
            room.halls.forEach(h => notify(`hall${h.id}`, true));
        }, onMouseLeave: () => room.halls.forEach(h => notify(`hall${h.id}`, false)) },
        React.createElement("strong", null, room.id),
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
            room.numExits),
        React.createElement("p", null,
            "Contents: ",
            room.contents.type,
            " - ",
            room.contents.description),
        React.createElement("p", null,
            "Treasure: ",
            room.contents.treasure.toString())));
};
