"use strict";

var express = require('express');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var valid = require('validator');

var donarSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: function validator(v) {
        return valid.isEmail(v);
      },
      message: "{VALUE} isn't valid email"
    }
  },
  password: String,
  number: String,
  location: String,
  bGroup: String
});
var Donar = mongoose.model('Donar', donarSchema);
module.exports = Donar;