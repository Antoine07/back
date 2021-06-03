'use strict';

import express from "express";
import router from "./router"; // fichier

const app = express(); 
const port = 3000;

app.set('view engine', 'ejs');

// middleware
app.use( (req, res, next) => {
  req.session  = { dices :  [[1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6]] };

  next();
})

app.use('/assets', express.static(__dirname + '/public'));
app.use(express.json()); 

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
