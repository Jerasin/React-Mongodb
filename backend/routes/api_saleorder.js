const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const saleordersSchema = require("../models/document_saleorder");
const productsSchema = require("../models/products");
const Constatns = require("../constatns");

const authorization = require("./../authentication/authorize");

//  Module for Create DataForm
const formidable = require("formidable");

// Create SO
router.post("/", authorization, async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async (error, fields, files) => {
    try {
      let result = await saleordersSchema.create(fields);
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

//  Get All Product
router.get("/", authorization,async (req, res) => {
  await saleordersSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// ตัด Stock
router.put("/",authorization, async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let id = parseInt(fields.product_Code);
     
      let result = await productsSchema.findOneAndUpdate(
        {product_Code: id},
        fields,
        async (err, result) => {
          if (err) return err;
          return res.json({
            result_id: result,
          });
        }
  
        );
  
      });
  } catch (err) {
    res.json({ status: "NOK", result: err });
  }
});

router.post("/test/:id",async (req, res) => {
  const { id } = req.params;
  saleordersSchema.find({document_Number: id} ,(err,data)=>{
    if(err) res.json(err)
    res.json(data)
  })
})

// Get SO By Id
router.route("/saleorder-detail/:id").post(authorization,async (req, res) => {
  const { page, limit} = req.body;
  const { id } = req.params;
  // let page = 1;
  // let limit = 5;
  let startIndex = (page - 1) * limit;
  let endIndex = limit * page;

  saleordersSchema
    .find({document_Number: id})
    .sort({ create_time: 1 })
    .exec((err, data) => {
      if(err) return res.json({status: 404 , message: "Not Found"})
      let lenth = data.length;
      if(lenth < 1) return res.json({status: 404 , message: "Not Found"})
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

      res.status(200).json({
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
