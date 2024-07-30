const express = require("express");
const { sequelize, Auto, Make, Stavka, Narudzbina } = require("../models");
const route = express.Router();
const authToken = require('../authToken');

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
    try{
      const kategorije = await Auto.findAll({
            include: [
              {
                model: Make,
                as: 'model' // Ovo 'as' mora da odgovara onome što ste definisali u asocijacijama
              }
            ]
          });
      return res.json(kategorije);
      
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
     try{
      const auto = await Auto.findByPk(req.params.id,{
         include: [
            {
              model: Make,
              as: 'model' // Ovo 'as' mora da odgovara onome što ste definisali u asocijacijama
            }
          ]
      });
      return res.json(auto);
      
     }catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
     }
  });
  
  
  route.post("/novo-auto/",authToken, async (req, res) => {
     try{
      const novi = await Auto.create(req.body);
      return res.json(novi);
      
     }catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
     }
  });
  
  
  route.put("/:id", async (req, res) => {
     try{
      const auto = await Auto.findByPk(req.params.id);
    	auto.naziv = req.body.naziv;
    	auto.opis = req.body.opis;
    	auto.cena = req.body.cena;
      auto.godiste = req.body.godiste;
      auto.snaga = req.body.snaga;
      auto.kubikaza = req.body.kubikaza;
    	auto.model_id = req.body.model_id;


    	auto.save();
    	return res.json(auto);
     }catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
     }
  });
  
  route.put("/promeni-cenu/:id", authToken,async (req, res) => {
      try {
         const auto = await Auto.findByPk(req.params.id);
         auto.cena = req.body.cena;
         await auto.save();
         return res.json(auto);
      } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
      }
  });
  
  route.delete("/:id", authToken, async (req, res) => {
     try{
      const auto = await Auto.findByPk(req.params.id);
	auto.destroy();
	return res.json( auto.id );

     }catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
     }
  });
  
 
