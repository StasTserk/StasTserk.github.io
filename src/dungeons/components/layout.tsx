const Layout = (props: React.PropsWithChildren<{ rooms: RoomDescription[] }>) => {
    console.log(props);
    return (
        <>
            <div className={ "dungeon-layout" }>
                {props.rooms.map(r => { return <Room room={r} key={r.id} />; })}
            </div>
        </>
    );
}

const Room = (props: React.PropsWithChildren<{ room: RoomDescription }>) => {
    const { room } = props;
    return <div className="room" style={{ top: room.location.y * 110 + 10, left: room.location.x * 110 + 10 }}><strong>{room.type}</strong> - {room.subtype}</div>
}