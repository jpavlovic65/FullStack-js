
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const app = express();
const corsOptions = {
	origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:8080','http://127.0.0.1:9001']
  };
app.use(cors(corsOptions));
function getCookies(req) {
    if (req.headers.cookie == null) return {};


    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};


    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });


    return parsedCookies;
};

 function authToken(req, res, next) {
    const cookies = getCookies(req);
    console.log(cookies)
   const token = cookies['token'];
    if (token == null) return res.redirect(301, '/login');
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       if (err) return res.redirect(301, '/login');
       req.user = user;

       // Proverite da li je korisnik admin
       if(user.isAdmin) {
           // Korisnik je admin
           next();
       } else {
           // Korisnik nije admin, vrati grešku ili preusmeri
           return res.status(403).json({ msg: "Access denied" });
       }
    });
 }


const BP = require('body-parser');
const Joi = require('joi');
const fs = require('fs');

// app.use( express.static( path.join(__dirname, 'static') ) );
// app.use('/novi-auto', BP.urlencoded({extended: false}));
// app.use('/novi-model', BP.urlencoded({extended: false}));


// Postavljamo staticki direktorijum za /admin/


//Služimo index.html za /admin/ putanju
app.get('/admin', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/admin' });
});
app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static/admin' });
});

app.use('/admin', express.static(path.join(__dirname, 'static/admin')));
app.use('/', express.static(path.join(__dirname, 'static/dist')));

app.get('/', (req, res) => {
  res.send('Ovo je glavna ruta');
});

app.post("/novi-auto", (req, res) => { 
    const shema = Joi.object().keys({
        Naziv: Joi.string().required(),
        Model: Joi.required(),
        Cena: Joi.number().greater(0).required(),
        Godiste: Joi.number().greater(0).required(),
        Snaga: Joi.number().required(),
        Kubikaza: Joi.number().required(),
        Opis: Joi.string(),
        Slika: Joi.string()

    });
    
    const {error, succ} = shema.validate(req.body);

    if (error) {
        res.send("Greška: " + error.details[0].message);
        return;
    }
    
    req.body.Opis = req.body.Opis.replace(/\r?\n|\r/g, '<br>');

    fs.appendFile("auto.txt", 
    JSON.stringify(req.body) + "\n", 
    function(err, succ){
        res.sendFile(path.join(__dirname, 'static', 'index.html'));
    }
);

});
  

app.post("/novi-model", (req, res) => { 
    const shema1 = Joi.object().keys({
        id: Joi.string().required(),
        naziv: Joi.string().required(),
        opis: Joi.string().required(),
        tip: Joi.string().required(),
        datum: Joi.string().required()
     

    });
    
    const {error, succ} = shema1.validate(req.body);

    if (error) {
        res.send("Greška: " + error.details[0].message);
        return;
    }
    
    //req.body.opis = req.body.opis.replace(/\r?\n|\r/g, '<br>');

    fs.appendFile("model.txt", 
    JSON.stringify(req.body) + "\n", 
    function(err, succ){
        res.send(req.body);
    }
);

});

app.get("/auta", (req, res) => {
    const auta = [];

    fs.readFile('auto.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        }
        else{
        const redovi = data.split('\n');

        for(let i=0; i<redovi.length; i++){
            if(redovi[i].trim() !== ''){
                try{
                    let obj = JSON.parse( redovi[i] ); 
                    auta.push(obj);               
                } catch(parseerror){
                    console.error("Error parsing json",parseerror);
                }
            }
           
        
        }
    
        res.json(auta);
    }

      });
      

    });
app.get("/model", (req, res) => {
    const model = [];

    fs.readFile('model.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        }
        else{
        const redovi = data.split('\n');

        for(let i=0; i<redovi.length; i++){
            if(redovi[i].trim() !== ''){
                try{
                    let obj = JSON.parse( redovi[i] ); 
                    model.push(obj);               
                } catch(parseerror){
                    console.error("Error parsing json",parseerror);
                }
            }
           
        
        }
    
        res.json(model);
    }

      });
      

    });
  
  
app.listen(8000);