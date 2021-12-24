const jsonServer = require('json-server')
const auth = require('json-server-auth')
const app = jsonServer.create()
const router = jsonServer.router('db.json');
const cors = require('cors')

app.db = router.db

//     console.log('');
//     console.log((new Date).toLocaleTimeString('pt-BR') + ' - Request: ' + req.hostname);
//     console.log(req.method + ' ' + req.path + ' -> ' + res.statusCode)
//     console.log(req.headers.authorization);

const rules = auth.rewriter({
    users: 600,
    categories: 660,
    tasks: 660,
    // "/users*": "/600/users$1",
    // "/categories*": "/640/categories$1",
    // "/tasks*": "/640/tasks$1"
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
    // if (req.method === 'GET') {
    //     console.log(req);
    //     next();
    // } else {
    //     if (req.path === '/login') {
    //         getToken(req, res);
    //     }
    //     isAuthorized(req, res, next); // Here
    // }
    next();
})
app.use(cors())
app.use(rules)
app.use(auth)
app.use(router)
app.listen(3000, () => {
    console.log("Server is running at port ", 3000);
});

// function isAuthorized(req, res, next) { // Pass 3 parmas to a express middleware

//     console.log("sadasdasdasd");

//     var token = req.headers['access-token'];
//     console.log(token);
//     // decode token
//     if (token) {
//         console.log("Inside token");
//         jwt.verify(token, 'json-server-auth-123456', (err, decoded) => {
//             console.log("Inside JWT fn");
//             if (err) {
//                 console.log("Inside JWT fn err");
//                 return res
//                     .status(401) // I think will be better if you throw http status is 401 to client
//                     .json({ message: 'invalid token' });
//             } else {
//                 console.log("Inside JWT fn success");
//                 req.decoded = decoded;
//                 return next(); // Only call "next" if everything is good, continue next jobs - handle secured requests
//             }
//         });

//     } else {
//         // if there is no token
//         return res
//             .status(401)
//             .send({
//                 message: 'No token provided.'
//             });
//     }
// }