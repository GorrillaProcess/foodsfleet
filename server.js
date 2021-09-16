const db = require("./db.js");
const Pizza = require("./models/pizzaModel");
const express = require ("express");
const path = require('path');
const pizzasRoute = require('./routes/pizzasRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const app=express();
app.use(express.json());
app.use('/api/pizzas/',pizzasRoute)
app.use('/api/users/',userRoute)
app.use('/api/orders/',orderRoute)

if(process.env.NODE_ENV === 'production'){
  app.use('/',express.static('client/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'/client/build/index.html'))

  })
}

 
app.get("/getallpizzas",(req,res)=>{
Pizza.find({},(err,docs)=>{
if(err){
  console.log(err);
}else{
  res.send(docs)
}
})
});
const port = process.env.PORT || 5000;
app.listen(port,()=>{
  console.log("Server is running at",port);
});
