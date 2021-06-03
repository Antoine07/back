'use strict';

import express from "express";
import router from "./router"; // fichier

const app = express(); 
const port = 3000;

console.log(2n * 100n); // vous pouvez faire du es2020 avec Babel

app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));
app.use(express.json()); 

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
