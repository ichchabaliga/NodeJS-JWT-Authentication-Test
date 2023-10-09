// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { expressjwt: exjwt } = require('express-jwt');
// const app = express();
// const port = 3000;
// const path = require('path');
// const bodyParser = require('body-parser');

// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
//     next();
// });
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));


// const secretKey = 'My private key 26';
// const jwtMW = exjwt({
//     secret: secretKey,
//     algorithms: ['HS256']
// });

// const users = [
//     {
//         id:3,
//         username: 'ichcha1',
//         password: 'baliga'
//     },{
//         id:2,
//         username: 'ichcha2',
//         password: 'baliga'
//     },{
//         id:1,
//         username: 'ichcha',
//         password: 'baliga'
//     }
// ];

// app.post('/api/login',(req,res) => {
//     const {username, password} = req.body;
//     let token = null;
//     for(let user of users){
//         console.log(user);
//         if(username == user.username && password == user.password) {
//             console.log('User found');
//             token = jwt.sign({id: user.id , username: user.username}, secretKey, {expiresIn: '3m'});
//             console.log(token);
            
//             break;
//         }
//     }
//     if(!token) {
//             res.status(401).json({
//                 success: false,
//                 token: null,
//                 err: 'Username or password is incorrect'
//             })
//         }
//     else {
//         res.json({
//             success: true,
//             err: null,
//             token
//         });}
//     }
// );

// app.get('/api/dashboard',  jwtMW, (req,res) => {
//     //console.log(req);
//     res.json({
//         success: true,
//         myContent: 'Secret content that only logged in people can see'
//     });
// });

// app.get('/api/settings',  jwtMW, (req,res) => {
//     //console.log(req);
//     res.json({
//         success: true,
//         myContent: "Ichcha's settings page"
//     });
// });

// app.get('/',(req,res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.use(function (err,req,res,next) {
//     if(err.name === 'UnauthorizedError') {
//         res.status(401).json({
//             success: false,
//             officialError:err,
//             err: 'Username or password is incorrect 2'
//         });
//     }
//     else {
//         next(err);
//     }
// });

// app.listen(port, () => {
//     console.log(`Serving app listening at http://localhost:${port}`)
//   });






// _______________________________________________________________________________________________________________________
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const exjwt = require('express-jwt');
const { expressjwt: exjwt } = require('express-jwt');


const secretKey = 'My secret key';

const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});

const users = [
        {
            id:3,
            username: 'ichcha1',
            password: '111'
        },{
            id:2,
            username: 'ichcha2',
            password: '222'
        },{
            id:1,
            username: 'ichcha',
            password: '3333'
        }
    ];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
});

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/login',(req,res) => {
    const {username, password} = req.body;
    let token = null;
    for(let user of users){
        console.log(user);
        if(username == user.username && password == user.password) {
            console.log('User found');
            token = jwt.sign({id: user.id , username: user.username}, secretKey, {expiresIn: '3m'});
            console.log(token);
            
            break;
        }
    }
    if(!token) {
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or password is incorrect'
            })
        }
    else {
        res.json({
            success: true,
            err: null,
            token
        });}
    }
);
app.get('/api/dashboard', jwtMW, (req,res) => {
    console.log(req);
    res.json({
        success: true,
        myContent: 'Secret content that only logged in people can see.'
    });
});

app.get('/api/settings', jwtMW, (req,res) => {
    console.log(req);
    res.json({
        success: true,
        myContent: 'This setting page is only seen when the user is logged in!'
    });
});

app.use(function(err, req, res, next){
    // console.log(err.name === 'UnauthorizedError');
    // console.log(err);
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({
            success: false,
            officialerr: err,
            err: 'Username or password incorrect 2!'
        });
    }
    else{
        next(err);
    }
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});