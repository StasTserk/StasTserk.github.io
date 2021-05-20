const RoomDetailContext = React.createContext({ setActiveRoom: () => { }, activeRoom: undefined });
const ActiveHallwayContext = React.createContext({ setActiveHallways: () => { }, activeHallways: [] });
const Layout = (props) => {
    const { x, y, size, padding } = dimensions;
    const [detailRoom, setDetailRoom] = React.useState(props.rooms[0]);
    const roomContext = {
        setActiveRoom: (r) => setDetailRoom(r),
        activeRoom: detailRoom
    };
    const [activeHalls, setActiveHalls] = React.useState([]);
    const hallContext = {
        activeHallways: activeHalls,
        setActiveHallways: setActiveHalls
    };
    return (React.createElement(RoomDetailContext.Provider, { value: roomContext },
        React.createElement(ActiveHallwayContext.Provider, { value: hallContext },
            React.createElement("div", { className: "dungeon-map" },
                React.createElement(Hallways, { halls: props.halls }),
                React.createElement("div", { className: "dungeon-layout", style: {
                        width: x * (size + padding) + padding,
                        height: y * (size + padding) + padding,
                    } }, props.rooms.map(r => { return React.createElement(Room, { room: r, key: r.id }); }))),
            React.createElement(RoomDetail, null))));
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
    return (React.createElement(ActiveHallwayContext.Consumer, null, ({ activeHallways }) => {
        const active = activeHallways.includes(props.hall.id);
        return (React.createElement("polyline", { fill: "none", stroke: active ? "gold" : "rgba(0, 0, 0, .2)", points: props.hall.path.map(p => `${p.x}, ${p.y}`).join(' '), strokeWidth: 3 }));
    }));
};
const Room = (props) => {
    const { size, padding } = dimensions;
    const { room } = props;
    const hasMonster = room.contents.type === "Creature" ? (React.createElement(React.Fragment, null, "\uD83D\uDC32")) : (React.createElement(React.Fragment, null));
    const hasTreasure = room.contents.treasure ? React.createElement(React.Fragment, null, "\uD83D\uDCB0") : React.createElement(React.Fragment, null);
    return (React.createElement(RoomDetailContext.Consumer, null, ({ setActiveRoom }) => (React.createElement(ActiveHallwayContext.Consumer, null, ({ setActiveHallways }) => (React.createElement("div", { className: "room", style: { top: room.location.y * (size + padding) + padding, left: room.location.x * (size + padding) + padding }, onMouseEnter: () => {
            setActiveRoom(room);
            setActiveHallways(room.halls.map(h => h.id));
        }, onMouseLeave: () => setActiveHallways([]) },
        React.createElement("span", { className: "number" }, room.id),
        " ",
        room.subtype,
        " ",
        hasMonster,
        " ",
        hasTreasure))))));
};
const RoomDetail = () => {
    return (React.createElement(RoomDetailContext.Consumer, null, ({ activeRoom }) => {
        return (React.createElement("div", { className: "room-detail" },
            React.createElement("div", { className: "description" },
                activeRoom.type,
                " - ",
                activeRoom.subtype),
            React.createElement("p", null,
                "Number of Exits: ",
                activeRoom.numExits),
            React.createElement("p", null,
                "Contents: ",
                activeRoom.contents.type,
                " - ",
                activeRoom.contents.description),
            React.createElement("p", null,
                "Treasure: ",
                activeRoom.contents.treasure.toString())));
    }));
};
