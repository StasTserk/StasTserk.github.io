var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var rooms = [
    __assign(__assign({}, getRoomDescription()), { id: "1" }),
    __assign(__assign({}, getRoomDescription()), { id: "2" }),
    __assign(__assign({}, getRoomDescription()), { id: "3" }),
    __assign(__assign({}, getRoomDescription()), { id: "4" }),
    __assign(__assign({}, getRoomDescription()), { id: "5" }),
];
var subscriptions = {};
function subscribe(topic, callback) {
    if (!subscriptions[topic]) {
        subscriptions[topic] = [];
    }
    if (subscriptions[topic].indexOf(callback) === -1) {
        subscriptions[topic].push(callback);
    }
}
function unsubscribe(topic, callback) {
    var subs = subscriptions[topic];
    if (subs) {
        var index = subs.indexOf(callback);
        if (index !== -1) {
            subscriptions[topic] = subs.splice(index, 1);
        }
    }
}
function notify(topic, value) {
    var subs = subscriptions[topic];
    if (subs) {
        subs.forEach(function (s) {
            s(value);
        });
    }
}
ReactDOM.render(React.createElement(Layout, { rooms: rooms }), document.getElementById('root'));
