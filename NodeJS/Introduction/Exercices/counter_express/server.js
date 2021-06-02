const express = require("express");

const app = express(); // une instance d'express
const port = 3000;

// moteur de tpling
app.set('view engine', 'ejs');

// mes assets statics 
app.use(express.static(__dirname + '/public'));

app.use(express.json()); 

app.get("/", (req, res) => {
  //res.json({ message: "Votre réponse" });

  res.render('pages/index', { title : "Hello EJS" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
