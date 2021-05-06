// create a server using express
const express = require('express')
const app=express()

//1.

// app.get('/', (req,res) => { 
//     res.send("hello sahil dabhi")
// })
//.listen ma 1 or 2 argument chale
// method-1
// app.listen(8080);

// method-2
// const port=8080;
// app.listen(port,()=>{
//     console.log(`A node JS API : ${port}`);
// })

//2.

// const postroutes=require('./route/post')

// app.get('/',postroutes.getpost);

// const port=8080;
// app.listen(port,()=>{
//     console.log(`A node JS API : ${port}`);
// })

//3.

// const morgan = require("morgan");
// const {getpost}=require('./route/post')

// const myownmiddleware = () =>   {console.log('middleware applied')}
// // // middleware
// app.use(morgan("dev"));
// app.use(myownmiddleware);
// app.get('/',getpost);

// const port=8080;
// app.listen(port,()=>{   console.log(`A node JS API : ${port}`); })


//4.

// const morgan = require("morgan");
// const postroutes=require('./route/post')

// app.use(morgan("dev"));

// app.use("/",postroutes);

// const port=8080;
// app.listen(port,()=>{   console.log(`A node JS API : ${port}`); })

//5.

const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
// cookie-parser sign-in mate use thay
const cookieParser = require('cookie-parser');
const expressvalidator = require("express-validator");
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

//db
mongoose.connect
        (   process.env.MONGO_URI,
            {useNewUrlParser: true, useUnifiedTopology: true}    
        )
            .then( () => {console.log('db connected')} )

mongoose.connection.on('error', err => {
    console.log(`db connection error: ${err.message} `)
} );

// bring in routes
const authroutes=require('./route/auth');
const userroutes=require('./route/user');
//apidocs
app.get('/',(req,res) =>
{
    fs.readFile('docs/apidocs.json',(err,data)=>
    {
        if(err)     res.status(400).json({error:err});
        
        const docs=JSON.parse(data);
        res.json(docs);
    })
})


//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressvalidator()); 
app.use(cors());
app.use("/",authroutes);
app.use("/",userroutes);

// custom middleware
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorised!"});
    }});



const port=process.env.PORT || 8080;

if(process.env.NODE_ENV == 'production')
{
    app.use(express.static("react-front/build"));
}

app.listen(port,()=>{   console.log(`A node JS API : ${port}`); })