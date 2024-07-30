const express = require("express");
const { sequelize, Auto, Make, Stavka, Narudzbina } = require("../models");
const { Model } = require("sequelize");
const route = express.Router();
const authToken = require('../authToken');
route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
    try{
      const model = await Make.findAll({});
      return res.json(model);
      
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id",authToken, async (req, res) => {
     try{
      const model = await Make.findByPk(req.params.id);
      return res.json(model);
      
     }catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
     }
  });
  
  
  route.post("/novi-model/",authToken, async (req, res) => {
     try{
      const novi = await Make.create(req.body);
      return res.json(novi);
      
     }catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
     }
  });
  
  
  route.put("/:id", authToken, async (req, res) => {
     try{
      const model = await Make.findByPk(req.params.id);
    

    	model.save();
    	return res.json(model);
     }catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
     }
  });
  
  
  route.delete("/:id", authToken,async (req, res) => {
     try{
      const model = await Make.findByPk(req.params.id);
	model.destroy();
	return res.json( model.id );

     }catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
     }
  });
  
 
