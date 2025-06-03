const express = require('express');
const app = express();

function log (req, res, next) {
    console.log(`Method: ${req.method} URL: ${req.url}`);
    console.log(new Date());

    next();

}

app.use(log)

app.get('/sum', (req,res)=>{
    const a =req.query.a
    const b =req.query.b

    res.json({
        answer:parseInt(a)+parseInt(b)
    })
})

// app.get('/multiply', (req,res)=>{
//     const a =req.query.a
//     const b =req.query.b

//     res.json({
//          answer:parseInt(a)*parseInt(b)
//     })
// })



app.listen(3000);