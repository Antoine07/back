'use strict';

import express from "express";
import router from "./router"; // fichier
// import dotenv from "dotenv";

// dotenv.config({path: __dirname + '/.env'});
// dotenv.parse(".env");

const app = express(); // une instance d'express
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.json()); 

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
