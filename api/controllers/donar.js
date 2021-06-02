const express = require('express')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const Donar = require('../Models/Donar')
const { json } = require('body-parser')
const { set } = require('mongoose')
const signUpController = (req,res)=>{
    res.render('home')
}
const postSignupController = (req,res)=>{
    bcrypt.hash(req.body.password,10 ,(err,hash)=>{
        if(err){
            console.log(err)
        }
   
let donar = new Donar({
    name:req.body.name,
    location:req.body.location,
    email: req.body.email,
    number:req.body.number,
    bGroup:req.body.bGroup,
    password:hash
})

donar.save()
.then(result=>{
    res.redirect('/donar/login')
})  
.catch(err=>{
    res.json({
        error
    })
})
})
}
const editController = (req,res)=>{
 Donar.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name,location:req.body.location,email:req.body.email, number:req.body.number,bGroup:req.body.bGroup}})
 .then(result=>{
     res.render('edit',{result:result})
     res.redirect('/donar/alldonar')
 })
 .catch(err=>{
    console.log(err)
 })
}
const loginController = (req,res)=>{
    res.render('login')
}
const postLoginController = (req,res)=>{
    let password = req.body.password;
    let email = req.body.email;
   
    Donar.findOne({email})
    .then(donar =>{
        if(donar){
            bcrypt.compare(password,donar.password,(err,result)=>{
                if(err){
                    res.json({
                        msg: "password doesn't match"
                    })
                }
                if(result){
                    res.redirect('/donar/alldonar')
                    
                }
            })

        }
        else{
           res.json({
               msg: "Donar can't find here"
           })
        }
    })
}
const allDonarController = (req,res)=>{
   Donar.find()
   .then(donar=>{
       res.render('alldonar',{donar:donar})
   })
   .catch()

    
}
const deleteController=(req,res)=>{
Donar.findByIdAndDelete({_id:req.params.id},(err,result)=>{
    console.log(err);
    res.redirect('/donar/alldonar');
})

}
module.exports= {
signUpController,
loginController,
allDonarController,
postSignupController,
postLoginController,
editController,
deleteController
}