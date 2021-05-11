const Layout = (props: React.PropsWithChildren<{ rooms: RoomDescription[], halls: Hallway[] }>) => {
    const { x, y, size, padding} = dimensions
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
        <RoomDetail room={ props.rooms[0] }/>
        </>
    );
}

const Hallways = (props: React.PropsWithChildren<{ halls: Hallway[] }>) => {
    const { x, y, size, padding} = dimensions
    return (
        <svg style={{
            width: x * (size + padding) + padding,
            height: y * (size + padding) + padding,
        }}>
            {props.halls.map((hall, index) => {
                return (<polyline key={index}
                    fill={"none"}
                    stroke={"black"}
                    points={hall.path.map(p => `${p.x}, ${p.y}`).join(' ')}
                />);
            })}
        </svg>
    );
}

const Room = (props: React.PropsWithChildren<{ room: RoomDescription }>) => {
    const { size, padding } = dimensions;
    const { room } = props;
    return (
        <div
            className="room"
            style={{ top: room.location.y * (size + padding) + padding, left: room.location.x * (size + padding) + padding }}
            onMouseEnter={ () => notify('hover', room)}
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