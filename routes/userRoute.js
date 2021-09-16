const express = require('express');
const router = express.Router();
const User = require('../models/userModels')
const bcrypt = require('bcryptjs');

router.post('/register',(req,res)=>{
    const {name,email,password}=req.body
    if(!email||!name||!password){
        res.status(422).json({error:"Something is missing!"});
      }
    const user = new User({name,email,password})
    try{
        user.save()
        res.send("User saved successfully!")
    }catch(error){
        return res.status(400).json({message:error})
    }
});
router.post('/login', async(req,res)=>{
    const {email,password} = req.body
    try{
    const user = await User.find({email,password})
    if(user.length>0){
       const currentUser = {
           name:user[0].name,
           email:user[0].email,
           isAdmin:user[0].isAdmin,
           _id:user[0]._id
       }
       res.send(currentUser);
    }else{
        return res.status(400).json({message:"User Login Failed"})
    }
    }catch(error){
        return res.status(400).json({message:"Something went wrong!"})
    
    }
    });
    router.get('/getallusers', async(req,res)=>{
        try {
            const users = await User.find({})
            res.send(users)
        } catch (error) {
            return res.status(400).json({message:error});   
        }
    })
    router.post('/deleteuser', async(req,res)=>{
        const userid = req.body.userid
        try {
           
            await User.findOneAndDelete({_id:userid})
            res.send("User deleted successfully")
        } catch (error) {
            return res.status(400).json({message:error});   
        }
    })
module.exports=router