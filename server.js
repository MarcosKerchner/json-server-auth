const jsonServer = require('json-server')
const auth = require('json-server-auth')
const app = jsonServer.create()
const router = jsonServer.router('db.json');
const cors = require('cors')

app.db = router.db

const rules = auth.rewriter({
    users: 600,
    categories: 660,
    tasks: 660,
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*, Authorization");
    res.header("access-control-allow-methods", "POST, GET, DELETE, PUT, OPTION");
    res.header('Origin');

    console.log('');
    console.log((new Date).toLocaleTimeString('pt-BR') + ' - Request: ' + req.hostname);
    console.log(req.method + ' ' + req.path + ' -> ' + res.statusCode)
    console.log(req.headers.authorization);
    next();
})
app.use(cors())
app.use(rules)
app.use(auth)
app.use(router)
app.listen(3000, () => {
    console.log("Server is running at port ", 3000);
});