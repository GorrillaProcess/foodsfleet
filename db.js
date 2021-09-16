const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://simeon_val:simeon_val@cluster0.8bius.mongodb.net/FoodFleet";

mongoose.connect(mongoURL,{useUnifiedTopology:true, useNewUrlParser:true})

var db = mongoose.connection

db.on("connected",()=>{
  console.log("MongoDB connection successfully!");
})
db.on("error",()=>{
  console.log("MongoDB connection failed");
})
module.export = mongoose
