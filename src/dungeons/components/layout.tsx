const Layout = (props: React.PropsWithChildren<{ rooms: RoomDescription[] }>) => {
    return (
        <>
            <div className={ "dungeon-layout" }>
                {props.rooms.map(r => { return <Room room={r} key={r.id} />; })}
            </div>
            <RoomDetail room={ props.rooms[0] }/>
        </>
    );
}

const Room = (props: React.PropsWithChildren<{ room: RoomDescription }>) => {
    const { room } = props;
    return (
        <div
            className="room"
            style={{ top: room.location.y * 110 + 10, left: room.location.x * 110 + 10 }}
            onMouseEnter={ () => notify('hover', room)}
        >
            <strong>{room.type}</strong> - {room.subtype}
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
        </div>
    );
}