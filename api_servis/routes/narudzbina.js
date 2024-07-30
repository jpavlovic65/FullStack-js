const express = require("express");
const { sequelize, Auto, Make, Stavka, Narudzbina } = require("../models");
const route = express.Router();
const authToken = require('../authToken');
route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", authToken,async (req, res) => {
    try{
      const kategorije = await Stavka.findAll({
            include: [
              {
                model: Auto,
                as: 'auto' // Ovo 'as' mora da odgovara onome što ste definisali u asocijacijama
              },
              {
                model: Narudzbina,
                as: 'narudzbina' // Ovo 'as' mora da odgovara onome što ste definisali u asocijacijama
              }
            ]
            
          });
      return res.json(kategorije);
      
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id",authToken, async (req, res) => {
    try{
     const narudzbina = await Stavka.findByPk(req.params.id,{
        include: [
            {
              model: Auto,
              as: 'auto' // Ovo 'as' mora da odgovara onome što ste definisali u asocijacijama
            },
            {
              model: Narudzbina,
              as: 'narudzbina' // Ovo 'as' mora da odgovara onome što ste definisali u asocijacijama
            }
          ]
     });
     
     return res.json(narudzbina);
     
    }catch(err){
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
    }
 });
 route.put("/:id",authToken, async (req, res) => {
  try {
     const narudzbina = await Narudzbina.findByPk(req.params.id);
     narudzbina.status = req.body.status;
     await narudzbina.save();
     return res.json(narudzbina);
  } catch (err) {
     console.log(err);
     res.status(500).json({ error: "Greska", data: err });
  }
});
route.post("/novo", authToken, async (req, res) => {
  try{
   const novi = await Narudzbina.create(req.body);
   return res.json(novi);
   
  }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
  }
});