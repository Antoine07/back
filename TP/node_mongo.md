
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

- Vous partirez des données suivantes à implémenter dans MongoDB. Vous êtes libre d'ajouter des clés/valeurs qui vou semble(nt) pertinent(s) pour réaliser le projet. Cependant vous n'utiliserez qu'un seul document dans votre base de données.

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

- Créez une classe ou fonction Game/game pour implémenter la logique principal du jeu. Vous pouvez également ajouter d'autre(s) fonctionnalité(s) en créant d'autre(s) fonction(s) ou classe(s).

- (Facultatif) Mémorisez les lettres déjà jouer et si l’utilisateur propose la même lettre ne pas décompter les coups avant arrêt du jeu.

- Chaque partie une fois terminée devra être enregistrée dans votre base de données. Elle permettra plus tard de faire des statistiques sur l'ensemble des parties. Pour ce point précis vous créerez un document spécifique.

