const express = require("express");
const { sequelize, Auto, Make, Stavka, Narudzbina } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.post("/novo", async (req, res) => {
  try{
   const novi = await Stavka.create(req.body);
   return res.json(novi);
   
  }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
    try{
     const narudzbina = await Stavka.findByPk(req.params.id,{
     
     });
     
     return res.json(narudzbina);
     
    }catch(err){
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
    }
 });
