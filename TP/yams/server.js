"use strict";

import express from "express";
import router from "./router"; // fichier
import cookieSession from "cookie-session";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// trust first proxy
app.set('trust proxy', 1) ;

app.use(cookieSession({
  name: 'session',
  keys: ['dices', 'date']
}));

app.use("/assets", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
