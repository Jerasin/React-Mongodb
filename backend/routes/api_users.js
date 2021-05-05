const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Import constatns
const constants = require("../constatns");

// Import Encode password
const bcrypt = require("bcryptjs");

// Users model
const usersSchema = require("./../models/users");
const Constatns = require("../constatns");

// Import Create Token
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

// Import Config File Env
const dotenv = require("dotenv");
dotenv.config();

const authorization = require("./../config/authorize");

const fs = require("fs");

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  usersSchema.findOne({ email: email }, (error, data) => {
    if (data != null) {
      if (bcrypt.compareSync(password, data.password)) {
        // ใช้ค่า privateKey เป็น buffer ค่าที่อ่านได้จากไฟล์ private.key ในโฟลเดอร์ config
        const privateKey = fs.readFileSync(
          __dirname + "./../config/private.key"
        );

        // generate a token with user id and secret
        const token = jwt.sign(
          { email: email, id: data._id },
          // process.env.JWT_SECRET
          privateKey ,  {
            expiresIn: Constatns.expiresInToken
          }
        );

        // persist the token as 't' in cookie with expiry date
        // res.cookie("t", token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        // const { id, first_name, last_name, email } = user;

        res.json({
          result: Constatns.STATUS_OK,
          message: JSON.stringify(data),
          token: token,
        });
      } else {
        res.json({
          result: Constatns.STATUS_NOK,
          message: "Incorrect password",
        });
      }
    } else {
      res.json({ result: Constatns.STATUS_NOK, message: "Incorrect email" });
    }
  });
});

// Register Users
router.post("/users", async (req, res, next) => {
  const { email, password } = req.body;

  usersSchema.findOne({ email: email }, async (error, data) => {
    if (data) {
      return res.json({
        status: "Duplicate",
        data,
      });
    } else {
      //    Encode password
      req.body.password = bcrypt.hashSync(req.body.password, 8);
      try {
        let result = await usersSchema.create(req.body);
        res.json({
          status: "OK",
          data: result,
        });
      } catch (error) {
        res.json({
          status: "NOK",
          data: error,
        });
      }
    }
  });
});

//  Get All Users
router.route("/").get(authorization, (req, res) => {
  usersSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//  Get UsersById
router.route("/user/:id").get((req, res) => {
  const { id } = req.params;
  usersSchema.findById(id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", docs);
      res.json(docs);
    }
  });
});

module.exports = router;
