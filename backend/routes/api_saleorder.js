const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const saleordersSchema = require("../models/document_saleorder");
const Constatns = require("../constatns");

//  Module for Create DataForm
const formidable = require("formidable");

// Create SO
router.post("/", async (req, res, next) => {
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
    })

    // console.log(req)





for (let index = 0; index < req.body.length; index++) {
    
    let Data = {
        document_Number: req.body[index].document_Number,
        product_Code: req.body[index].product_Code,
        product_Price: req.body[index].product_Price,
        product_Stock: req.body[index].product_Stock,
        product_Name: req.body[index].product_Name
    }
    // console.log(Data);
    req.body = Data
    try {
        let result = await saleordersSchema.create(req.body);
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


router.get('/', async (req,res)=>{
    res.json({status: "OK"})
})

module.exports = router;
