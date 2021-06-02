const express = require("express");
const router = require('./app_router');

const app = express(); // une instance d'express
const port = 3000;

// moteur de tpling
app.set('view engine', 'ejs');

// mes assets statics 
app.use(express.static(__dirname + '/public'));

app.use(express.json()); 

// middleware
app.use((req, res, next) => {
  console.log("Hello 1", req.url);

  next();
});

app.use((req, res, next) => {
  console.log("Hello 2", req.url);

  next();
});

app.use('/book', router);

// verb GET HTTP
app.get("/", (req, res) => {
  //res.json({ message: "Votre réponse" });

  res.render('pages/index', { title : "Hello EJS" });
});

// curl -X POST -F 'name="Alan"' http://127.0.0.1:3000/add
app.post("/add", (req, res) => {
  res.send("POST request to the homepage");
});

// curl -H "Accept: Application/json" -X GET http://localhost:3000/user/198

app.get("/user/:id", (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);

  next(); // nécessaire sinon on reste bloqué ici ... Car ce middleware s'exécute avant les autres
});

app.get("/user/:id", (req, res, next) => {
  res.json({ userID: req.params.id });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
