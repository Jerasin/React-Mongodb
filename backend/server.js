//  Express is Libary js manage route Request and Response
const express = require("express");
const app = express();

const createError = require('http-errors');

const port = process.env.PORT || 4000

// import Connect Mongodb
const mongoose = require("mongoose");

const cors = require("cors");

// Manage Request and Response About Json and Unicoded
const bodyParser =  require("body-parser");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/upload"))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors());



// EndPoint api 
const dbconfig = require('./database/db.js');

// Express Route
const usersRoute = require("./routes/api_users");
app.use("/api/authen", usersRoute)

const productsRoute = require("./routes/api_stock");
app.use("/api/stock", productsRoute)

// Connect Mongodb
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db,{
    useNewUrlParser: true
}).then(()=>{
    console.log("Database Successfully")
},
    error =>{
        console.log(error);
    }
)

app.listen(port,()=>{
    console.log("Server running " +  port)
})

// 404 Error
app.use((req,res,next)=>{
    next(createError(404))
})

// Error handle
app.use((err,req,res,next) =>{
    console.log(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})

