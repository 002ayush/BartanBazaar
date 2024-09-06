
const express = require('express');
const http = require('http')

const app = express();
app.use("/",(req,res,next)=>{
    console.log("This will run first");
    next();
    
})
app.use("/add-product",(req,res,next) => {
    console.log("Another middleware is used over here");
    res.send("Add Product page is added over here...");
    
})
app.use("/",(req,res,next)  => {
    console.log("First middleware");
    res.send("<h1>Hello First Middleware</h1>");
    next();
})



const server = http.createServer(app);
server.listen(3000);