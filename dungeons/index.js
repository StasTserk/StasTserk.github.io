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
GenerateDungeon();
ReactDOM.render(React.createElement(Layout, { rooms: rooms, halls: halls }), document.getElementById('root'));
