declare type RoomContextData = {
    setActiveRoom: (r: RoomDescription) => void,
    activeRoom: RoomDescription
}

const RoomDetailContext = React.createContext<RoomContextData>({ setActiveRoom: () => { }, activeRoom: undefined });

declare type ActiveHallwayContextData = {
    setActiveHallways: (ids: number[]) => void,
    activeHallways: number[];
}
const ActiveHallwayContext = React.createContext<ActiveHallwayContextData>({ setActiveHallways: () => { }, activeHallways: [] });

const Layout = (props: React.PropsWithoutRef<{ rooms: RoomDescription[], halls: Hallway[] }>) => {
    const { x, y, size, padding } = dimensions;

    const [detailRoom, setDetailRoom] = React.useState<RoomDescription>(props.rooms[0]);
    const roomContext: RoomContextData = {
        setActiveRoom: (r) => setDetailRoom(r),
        activeRoom: detailRoom
    }

    const [activeHalls, setActiveHalls] = React.useState<number[]>([]);
    const hallContext: ActiveHallwayContextData = {
        activeHallways: activeHalls,
        setActiveHallways: setActiveHalls
    }

    return (
        <RoomDetailContext.Provider value={roomContext} >
        <ActiveHallwayContext.Provider value={hallContext} >
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
            <RoomDetail/>
        </ActiveHallwayContext.Provider>
        </RoomDetailContext.Provider>
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
    return (
        <ActiveHallwayContext.Consumer>
            {({ activeHallways }) => {
                const active = activeHallways.includes(props.hall.id);
                return (<polyline
                    fill={"none"}
                    stroke={active ? "gold" : "rgba(0, 0, 0, .2)"}
                    points={props.hall.path.map(p => `${p.x}, ${p.y}`).join(' ')}
                    strokeWidth={3} />);
            }}
        </ActiveHallwayContext.Consumer>);
}

const Room = (props: React.PropsWithoutRef<{ room: RoomDescription }>) => {
    const { size, padding } = dimensions;
    const { room } = props;
    const hasMonster = room.contents.type === "Creature" ? (<>&#128050;</>) : (<></>);
    const hasTreasure = room.contents.treasure ? <>&#128176;</> : <></>
    return (
        <RoomDetailContext.Consumer>
            {({ setActiveRoom }) => (
                <ActiveHallwayContext.Consumer>
                    {({ setActiveHallways }) => (
                        <div
                            className="room"
                            style={{ top: room.location.y * (size + padding) + padding, left: room.location.x * (size + padding) + padding }}
                            onMouseEnter={() => {
                                setActiveRoom(room);
                                setActiveHallways(room.halls.map(h => h.id));
                            }}
                            onMouseLeave={() => setActiveHallways([])}
                        >
                            <span className={"number"}>{room.id}</span> {room.subtype} {hasMonster} {hasTreasure}
                        </div>
                    )}
                </ActiveHallwayContext.Consumer>)
            }
        </RoomDetailContext.Consumer>
    );
}

const RoomDetail = () => {
    return (
        <RoomDetailContext.Consumer>{
            ({ activeRoom }) => {
                return (<div className="room-detail">
                    <div className="description">{activeRoom.type} - {activeRoom.subtype}</div>
                    <p>
                        Number of Exits: {activeRoom.numExits}
                    </p>
                    <p>
                        Contents: {activeRoom.contents.type} - {activeRoom.contents.description}
                    </p>
                    <p>
                        Treasure: {activeRoom.contents.treasure.toString()}
                    </p>
                </div>);
            }
        }</RoomDetailContext.Consumer>
    );
}