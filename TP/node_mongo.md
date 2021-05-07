
# TP jeu du Pendu

## Sujet

Nous vous proposons le développement du jeu du pendu.

Le jeu consistera à deviner un mot partiellement caché en un minimum de 7 coups.

Le jeu aura les trois statuts suivants :

- Progress, Loser et Winner.

Vous devez utiliser la console et process de NodeJS pour l'interaction avec le joueur. La persistance sera faite avec MongoDB.

## Contraintes techniques

- Vous devez modéliser une base de données pour le jeu à l'aide de MongoDB. 

- Vous devez avoir une structuration du projet conforme à une application Node comme suit:

```text
src/
    utils.js
app.js
package.json
```

- Utilisez Git pour versionner l'implémentation des fonctionnalités.

- Vous partirez des données minimalistes suivantes à implémenter dans MongoDB, vous êtes libre d'ajouter des clés/valeurs vous semblant pertinent:

```js

const MockWords = [
    { word: "cornedrue", hide: "#o######e" },
    { word: "cognards", hide: "c######s" },
    { word: "fourchelang", hide: "########a#g" },
    { word: "gringotts", hide: "#######tts" },
    { word: "hyppogriffes", hide: "####o######s" },
];
```

## Fonctionnalités

- Créez une classe ou fonction Game/game pour implémenter la logique du jeu.

- Mémorisez les lettres déjà jouer et si l’utilisateur propose la même lettre ne pas décompter les coups avant arrêt du jeu.

- Chaque partie une fois terminée devra être enregistrée dans votre base de données. Elle permettra plus tard de faire des statistiques sur l'ensemble des parties.

