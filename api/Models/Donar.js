const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const valid =require('validator')
const donarSchema = new Schema({
    name:String,
    email: {
        type:String,
        trim:true,
        unique:true,
        validate:{
            validator:(v)=>{
                return valid.isEmail(v)
            },
            message:`{VALUE} isn't valid email`
        }

    },
    password:String,
    number:String,
    location:String,
    bGroup:String
})
var Donar = mongoose.model('Donar',donarSchema)
module.exports = Donar