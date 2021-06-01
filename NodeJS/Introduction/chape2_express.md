# Express

On peut développer des serveurs Web en Node.js, mais cela prend du temps

```bahs
npm init -y

npm install --save express
```

Exemple de serveur Express :

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

## CROS

CORS signifie "Cross Origin Resource Sharing", nous allons en avoir besoin pour la suite de l'exercice. En effet, nous allons consommer une API NodeJS avec fetch et donc avoir deux adresse de serveurs différents.

Utilisez le middleware suivant, il s'exécutera pour chaque requête.

```js
const cors = require('cors');

app.use(cors());
```

## Exercice Authors

Structurez le projet avec Express et affichez la liste des auteurs suivantes dans la page index.html de votre choix. Vous mettrez cette liste dans un fichier à part et l'importerez dans le serveur. Les auteurs seront récupérés à l'adresse suivante :

- adresse : /authors de votre serveur Express.

- liste des auteurs

```js
const authors = [{
    "_id": "3hj9ecwzc5",
    "name": "Alan",
    "title": "Eloquent JavaScript, Second Edition"
},
{
    "_id": "ii3v6javys",
    "name": "Albert",
    "title": "Le début d'un nouveau",
}
];

```