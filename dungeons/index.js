const rooms = [
    { ...getRoomDescription(), id: "1" },
    { ...getRoomDescription(), id: "2" },
    { ...getRoomDescription(), id: "3" },
    { ...getRoomDescription(), id: "4" },
    { ...getRoomDescription(), id: "5" },
];
const halls = [
    linkRoom(rooms[0], randomDirection(), rooms[1], randomDirection()),
    linkRoom(rooms[1], randomDirection(), rooms[2], randomDirection()),
    linkRoom(rooms[2], randomDirection(), rooms[3], randomDirection()),
    linkRoom(rooms[3], randomDirection(), rooms[4], randomDirection())
];
const subscriptions = {};
function subscribe(topic, callback) {
    if (!subscriptions[topic]) {
        subscriptions[topic] = [];
    }
    if (subscriptions[topic].indexOf(callback) === -1) {
        subscriptions[topic].push(callback);
    }
}
function unsubscribe(topic, callback) {
    const subs = subscriptions[topic];
    if (subs) {
        const index = subs.indexOf(callback);
        if (index !== -1) {
            subscriptions[topic] = subs.splice(index, 1);
        }
    }
}
function notify(topic, value) {
    const subs = subscriptions[topic];
    if (subs) {
        subs.forEach(s => {
            s(value);
        });
    }
}
ReactDOM.render(React.createElement(Layout, { rooms: rooms, halls: halls }), document.getElementById('root'));
