const express = require("express");

const app = express(); // une instance d'express
const port = 3000;
let counter = 0;

// moteur de tpling
app.set('view engine', 'ejs');

// mes assets statics 
app.use(express.static(__dirname + '/public'));

app.use(express.json()); 

app.get("/counter", (req, res, next) => {
  counter+=1 ;
  res.redirect('/');
});

app.get("/", (req, res) => {
  console.log(counter);
  res.render('pages/index', { title : "Hello EJS" , counter });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
