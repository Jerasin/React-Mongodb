//  Express is Libary js manage route Request and Response
const express = require("express");
const app = express();

const createError = require('http-errors');

const port = process.env.PORT || 4000

// import Connect Mongodb
const mongoose = require("mongoose");

// Cross origin Resource Shareing เช็คว่าเป็น Same origin = (protocol + host  + port) ต้องเหมือนกัน / Path ต่างกันได้
// Cross Origin = (protocol + host  + port) ต่างกัน
const cors = require("cors");

// Manage Request and Response About Json and Unicoded
// const bodyParser =  require("body-parser"); bodyParser เลิกใช้ไปแล้ว

app.use(express.json());
app.use(express.static(__dirname + "/upload"))
app.use(express.urlencoded({
    extended: true
}))

app.use(cors());



// DB Config
const config = require("./config/config");


// Express Route
const usersRoute = require("./routes/api_users");
app.use("/api/authen", usersRoute)

const productsRoute = require("./routes/api_stock");
app.use("/api/stock", productsRoute)

const saleorderRoute = require('./routes/api_saleorder');
app.use("/api/saleorder" , saleorderRoute)

const saleorderlistRoute = require('./routes/api_saleorderlist');
app.use("/api/saleorderlist" , saleorderlistRoute)

// Connect Mongodb

mongoose.connect(config.mongoUri,{ useNewUrlParser: true , useUnifiedTopology: true})

app.listen(port,()=>{
    console.log("Server running "+ port)
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

