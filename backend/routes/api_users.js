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

const authorization = require("./../authentication/authorize");
authorization;
const fs = require("fs");


// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  usersSchema.findOne({ email: email }, (error, data) => {
    if (data != null) {
      if (bcrypt.compareSync(password, data.password)) {
        // generate a token with user id and secret
        const token = jwt.sign(
          {
            email: email,
            id: data._id,
            userRole: data.userRole,
            user_Code: data.user_Code,
          },
          // process.env.JWT_SECRET
          process.env.JWT_SECRET,
          {
            expiresIn: Constatns.expiresInToken,
          }
        );

        // persist the token as 't' in cookie with expiry date
        // res.cookie("t", token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        // const { id, first_name, last_name, email } = user;

        res.json({
          status: 200,
          result: data,
          token: token,
        });
      } else {
        res.json({
          status: 404,
          result: "Incorrect password"
          
        });
      }
    } else {
      res.json({ status: 404, result: "Incorrect email" });
    }
  });
});

// Register Users
router.post("/user", async (req, res, next) => {
  const { email, password } = req.body;

  usersSchema.findOne({ email: email }, async (error, result) => {
    if (data) {
      return res.json({
        status: "Duplicate",
        result: result,
      });
    } else {
      //    Encode password
      req.body.password = bcrypt.hashSync(req.body.password, 8);
      try {
        let result = await usersSchema.create(req.body);
        res.json({
          status: 200,
          result: result,
        });
      } catch (error) {
        res.json({
          status: 404,
          result: error,
        });
      }
    }
  });
});

//  Get All Users
router.route("/users").post(authorization, async (req, res) => {
  const { page, limit } = req.body;
  // let page = 1;
  // let limit = 5;
  let startIndex = (page - 1) * limit;
  let endIndex = limit * page;

  usersSchema
    .find()
    .sort({ create_time: 1 })
    .exec((err, data) => {
      let lenth = data.length;
      let result = data.slice(startIndex, endIndex);
      let allPage = Math.ceil(lenth / limit);

      const next = () => {
        return parseInt(page) + 1;
      };

      const now = () => {
        return parseInt(page);
      };

      const after = () => {
        return parseInt(page) - 1;
      };

      const last = () => {
        return allPage;
      };
      if(err) return res.json({status: 404 , result: err})
      res.json({
        lenthData: lenth,
        limit: limit,
        after: after(),
        now: now(),
        next: next(),
        last: last(),
        result: result,
      });
    });
});

//  Get UsersById
router.route("/user/:id").get(authorization,(req, res) => {
  const { id } = req.params;

  usersSchema.find({ user_Code: id }, (err, result) => {
    if(result === undefined) return res.json({ status: 404, result: "Not Found" });
    let length = result.length
    // if (length === 0)
    //   return res.json({ status: 404, result: "Not Found" });
    if (err) return res.json({status: 404 ,result: err});

    res.json({ status: 200, result: result });
  });
});

// Update User By ID
router.put("/user/:id",authorization, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    console.log(req.body)
    let result = await usersSchema.findOneAndUpdate({user_Code: id},{...req.body,update_date: Date.now()})
    if(result === null) return res.json({status: 404 , result: "Not Found"})
    res.json({status: 200 , result: result})
    
    
  } catch (err) {
    res.json({ status: 404, result: err });
  }
});

module.exports = router;
