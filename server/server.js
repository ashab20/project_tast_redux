const jsonServer = require("json-server");
const auth = require("json-server-auth");


const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 9000;


// Bind the router db to the app
server.db = router.db;

server.use(middlewares);

const rules = auth.rewriter({
    users: 640,
    teams: 660,
    members: 660,
    state: 660,
});

server.use(rules);
server.use(auth);
server.use(router);

server.listen(PORT);