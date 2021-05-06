# Introduction

Installez les dépendances suivantes :

```bash
npm install -g nodemon

npm init -y

npm install --save express
```

## Installez un serveur 

Créez le fichier suivant et lancer le serveur à l'aide de la commande ci-après.

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Commandes pour lancer votre serveur :

1. De manière simple avec NodeJS uniquement

```bash
node server
```

2. Avec le deamon

```bash
nodemon server
```

## Exercice afficher sa première page (server)

Respectez la structure de dossier et fichiers suivantes :

```text
hello
  ├──server.js
  ├──pages
  │  └──index.html
  └──package.json
```

En utilisant les dépendances suivantes afficher une page avec un titre de niveau 1 centré affichant "Hello NodeJs".

```js
const fs = require('fs');
const dirPath = path.join(__dirname, '/pages');
```

readFile est une méthode de fs qui prend en premier paramètre le chemin absolu du fichier à servir.

## Flux primitif process (console)

stdin en lecture contient le flux d'entrée système standard de votre programme.

stdout sortie standard en écriture du système pour votre programme.

stderr sortie standard des erreurs.

## Exercice avec process

Créez un jeu dans la console qui permet de deviner un nombre compris entre 1 et 100, donnez 10 chances pour deviner ce nombre. Indiquez si vous êtes au dessus ou en dessous du nombre à devenier. 

Vous pouvez réaliser ce petit projet dans un seul et même fichier.

Pour lancer votre projet tapez dans la console la ligne de code suivante :

```bash
node app.js
```

Aidez-vous du seveur de flux ci-dessous :

```js
const process = require('process');

// Définit l'encodage des caractères dans le flux de la console.
process.stdin.setEncoding('utf8'); 

process.stdin.on('data', (data) => {
    // lecture des données en entrée
    console.log(data.toString().trim());

    // process pour finir le jeu
    if (false) {
        console.log('end');
        process.stdin.pause();
    } else {
        console.log('message');
        process.stdout.write('> ');
    }
});

// Démarrer le jeu
console.log('hello');
process.stdout.write('> ');
```

## Exercice console faire défiler les résultats

Créez un script permettant d'afficher en console les restaurants par type de cuisine dans le Bronx uniquement. Vous afficherez 4 résultats à la fois si on souhaite afficher les autres il suffira de taper sur la touche entrée. Pour arrêter l'affichage avant la fin on tapera sur la touche q.

Affichez en console les informations suivantes :

- Nom du restaurant.

- Coordonnées GPS.

Dans un dossier console initialisez votre projet à l'aide de la commande suivante :

```bash
npm init -y
```

Puis installez dans ce dossier **mongob** à l'aide de npm.

Pour se connecter à la base de données ny. Aidez-vous de l'exemple ci-dessous :

```js
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri , { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db('ny');
    const restaurants = database.collection('restaurants');

    // Query for a movie that has the title 'Back to the Future'
    const query = { cuisine: 'Italian' };
    const italian = await restaurants.findOne(query);

    console.log(italian); // affichera les résultats en console.
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(() => console.log('end'));
```

## Exercice borough restaurant par quartier

Reprendre la configuration précédente et travaillez dans un dossier borough

1. En utilisant le module process de Node proposez de renseigner deux champs respectivement le nom du quartier et le type de restaurants, puis affichez en console le nombre de restaurant de ce type dans le quartier sélectionné. Ordonnez les restaurants par critères de score, proposez les restaurants ayant eu les meilleurs appréciations.

2. Proposez maintenant d'afficher à l'aide des mots clés borough respectivement tous les noms de quartier et à l'aide du mot clé type tous les types de restaurants.

