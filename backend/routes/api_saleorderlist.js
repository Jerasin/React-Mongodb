const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const saleorderlistSchema = require("../models/document_saleorderlist");

const Constatns = require("../constatns");

const authorization = require("./../authentication/authorize");

//  Module for Create DataForm
const formidable = require("formidable");

// Create SO List
router.post("/", authorization, async (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
 
        try {
        let result = await saleorderlistSchema.create(fields);
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
  
});
  });


  // Get SO List Iimit By User Role
router.route("/getSaleOrderList").post(async (req, res) => {
  const { page, limit , user } = req.body;
  // let page = 1;
  // let limit = 5;
  let startIndex = (page - 1) * limit;
  let endIndex = limit * page;

  saleorderlistSchema
    .find({create_by: user})
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

// Get SO List Iimit By User Admin
router.route("/getSaleOrderLists").post(async (req, res) => {
  const { page, limit} = req.body;
  // let page = 1;
  // let limit = 5;
  let startIndex = (page - 1) * limit;
  let endIndex = limit * page;

  saleorderlistSchema
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

module.exports = router; 