const rooms = [
    { ...getRoomDescription(), id: "1" },
    { ...getRoomDescription(), id: "2" },
    { ...getRoomDescription(), id: "3" },
    { ...getRoomDescription(), id: "4" },
    { ...getRoomDescription(), id: "5" },
];

ReactDOM.render(<Layout rooms={rooms}/>, document.getElementById('root'))