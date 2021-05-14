const subscriptions: { [k: string]: ((value: unknown) => void)[] } = {}

function subscribe(topic: string, callback: (value: unknown) => void) {
    if (!subscriptions[topic]) {
        subscriptions[topic] = [];
    }
    if (subscriptions[topic].indexOf(callback) === -1) {
        subscriptions[topic].push(callback);
    }
}

function unsubscribe(topic: string, callback: (value: unknown) => void) {
    const subs = subscriptions[topic];
    if (subs) {
        const index = subs.indexOf(callback);
        if (index !== -1) {
            subscriptions[topic] = subs.splice(index, 1);
        }
    }
}

function notify(topic: string, value: unknown): void {
    const subs = subscriptions[topic];
    if (subs) {
        subs.forEach(s => {
            s(value);
        });
    }
}

const seed = new URLSearchParams(window.location.search).get("seed");
if (!seed) {
    window.location.href = `?seed=${Math.floor(Math.random() * 1000000).toString()}`
}

GenerateDungeon(seed);

ReactDOM.render(<Layout rooms={rooms} halls={halls} />, document.getElementById('root'))