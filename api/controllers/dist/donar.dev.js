"use strict";

var express = require('express');

var ejs = require('ejs');

var bcrypt = require('bcrypt');

var Donar = require('../Models/Donar');

var _require = require('body-parser'),
    json = _require.json;

var _require2 = require('mongoose'),
    set = _require2.set;

var signUpController = function signUpController(req, res) {
  res.render('home');
};

var postSignupController = function postSignupController(req, res) {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      console.log(err);
    }

    var donar = new Donar({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      number: req.body.number,
      bGroup: req.body.bGroup,
      password: hash
    });
    donar.save().then(function (result) {
      res.redirect('/donar/login');
    })["catch"](function (err) {
      res.json({
        error: error
      });
    });
  });
};

var editController = function editController(req, res) {
  Donar.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      number: req.body.number,
      bGroup: req.body.bGroup
    }
  }).then(function (result) {
    res.render('edit', {
      result: result
    });
    res.redirect('/donar/alldonar');
  })["catch"](function (err) {
    console.log(err);
  });
};

var loginController = function loginController(req, res) {
  res.render('login');
};

var postLoginController = function postLoginController(req, res) {
  var password = req.body.password;
  var email = req.body.email;
  Donar.findOne({
    email: email
  }).then(function (donar) {
    if (donar) {
      bcrypt.compare(password, donar.password, function (err, result) {
        if (err) {
          res.json({
            msg: "password doesn't match"
          });
        }

        if (result) {
          res.redirect('/donar/alldonar');
        }
      });
    } else {
      res.json({
        msg: "Donar can't find here"
      });
    }
  });
};

var allDonarController = function allDonarController(req, res) {
  Donar.find().then(function (donar) {
    res.render('alldonar', {
      donar: donar
    });
  })["catch"]();
};

var deleteController = function deleteController(req, res) {
  Donar.findByIdAndDelete({
    _id: req.params.id
  }, function (err, result) {
    console.log(err);
    res.redirect('/donar/alldonar');
  });
};

module.exports = {
  signUpController: signUpController,
  loginController: loginController,
  allDonarController: allDonarController,
  postSignupController: postSignupController,
  postLoginController: postLoginController,
  editController: editController,
  deleteController: deleteController
};