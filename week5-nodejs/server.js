const express = require('express');
const app = express();

const users = []

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/user', (req, res) => {
    const {name, password} = req.body;
    let user = {name, password};
    users.push(user);
    res.send(user);
})

app.get('/users', (req, res) => {
    res.send(users);
})

app.get('/user/:name', (req, res) => {
    let name = req.params.name;
    let user = users.find(user => user.name == name);
    res.send(user);
})


// function log (req, res, next) {
//     console.log(`Method: ${req.method} URL: ${req.url}`);
//     console.log(new Date());

//     next();

// }

// app.use(log)

// app.get('/sum', (req,res)=>{
//     const a =req.query.a
//     const b =req.query.b

//     res.json({
//         answer:parseInt(a)+parseInt(b)
//     })
// })

// app.get('/multiply', (req,res)=>{
//     const a =req.query.a
//     const b =req.query.b

//     res.json({
//          answer:parseInt(a)*parseInt(b)
//     })
// })



app.listen(3000);