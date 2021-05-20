
const seed = new URLSearchParams(window.location.search).get("seed");
if (!seed) {
    window.location.href = `?seed=${Math.floor(Math.random() * 1000000).toString()}`
}

GenerateDungeon(seed);




ReactDOM.render(<Layout rooms={rooms} halls={halls} />, document.getElementById('root'))