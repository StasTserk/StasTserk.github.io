const Layout = (props: React.PropsWithoutRef<{ rooms: RoomDescription[], halls: Hallway[] }>) => {
    const { x, y, size, padding } = dimensions;

    return (
        <>
        <div className={ "dungeon-map"}>
            <Hallways halls={props.halls} />
            <div
                className={"dungeon-layout"}
                style={{
                    width: x * (size + padding) + padding,
                    height: y * (size + padding) + padding,
                }}
            >
                {props.rooms.map(r => { return <Room room={r} key={r.id} />; })}
            </div>
        </div>
        <RoomDetail room={props.rooms[0]} />
        </>
    );
}

const Hallways = (props: React.PropsWithoutRef<{ halls: Hallway[] }>) => {
    const { x, y, size, padding } = dimensions;
    return (
        <svg style={{
            width: x * (size + padding) + padding,
            height: y * (size + padding) + padding,
        }}>
            {props.halls.map((hall) => {
                return <Hall hall={hall} key={hall.id} />
            })}
        </svg>
    );
}

const Hall = (props: React.PropsWithoutRef<{ hall: Hallway }>) => {
    const [active, setActive] = React.useState(false);
    React.useEffect(() => {
        subscribe(`hall${props.hall.id}`, (state: boolean) => {
            setActive(state);
        })
    }, []);

    return (<polyline key={props.hall.id}
        fill={"none"}
        stroke={active ? "gold" : "black"}
        points={props.hall.path.map(p => `${p.x}, ${p.y}`).join(' ')}
        strokeWidth={3}
    />);
}

const Room = (props: React.PropsWithoutRef<{ room: RoomDescription }>) => {
    const { size, padding } = dimensions;
    const { room } = props;
    return (
        <div
            className="room"
            style={{ top: room.location.y * (size + padding) + padding, left: room.location.x * (size + padding) + padding }}
            onMouseEnter={() => {
                notify('hover', room);
                room.halls.forEach(h => notify(`hall${h.id}`, true));
            }}
            onMouseLeave={() => room.halls.forEach(h => notify(`hall${h.id}`, false))}
        >
            <strong>{room.id}</strong> - {room.subtype}
        </div>
    );
}

const RoomDetail = (props: React.PropsWithChildren<{ room: RoomDescription }>) => {
    const [room, setRoom] = React.useState(props.room);
    subscribe("hover", setRoom);
    return (
        <div className="room-detail">
            <div className="description">{room.type} - {room.subtype}</div>
            <p>
                Number of Exits: {room.numExits}
            </p>
            <p>
                Contents: {room.contents.type} - {room.contents.description}
            </p>
            <p>
                Treasure: {room.contents.treasure.toString()}
            </p>
        </div>
    );
}