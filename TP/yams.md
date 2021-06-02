# Game Yams

## Introduction

Aidez-vous des supports de cours sur le serveur Git. Sur la partie MongoDB. Demandez de l'aide si besoin.

## Contraintes techniques 

Vous devez utiliser : bootstrap CSS ou un framework CSS de votre choix, Express, ejs ou un autre moteur de templating de votre choix et MongoDB.

Facultatif : vous pouvez utiliser Mongoose comme ORM pour MongoDB.

## Présentation générale

Le client est un chocolatier il veut organiser un jeu en ligne, une sorte de Yams où le client lancerait 5 dés à l'aide d'un bouton unique. Selon des combinaisons il gagnerait ou pas des/une pâtisserie(s). Il organise ce jeu pour fidéliser sa clientèle et dans une certaine mesure faire parler de lui et de sa chocolaterie au près d'autres clients potentiels. Il a dans ce but accolé sur sa vitrine des affiches publicitaires annonçant le jeu. L'évènement est également largement diffusé auprès de sa propre clientèle à l'aide de flyers qu'il distribue.

Il imagine une page Web unique présentant le jeu avec au préalable une inscription nécessaire pour commencer (inscription facultative). Cet évènement durera tant que 50 pâtisseries ne seront pas gagnées. Le jeu n'a pas de limite dans le temps. Et une fois le jeu terminé on affichera la page des résultats. Elle affichera l'ordre dans lequel les pâtisseries auront été gagnée(s) avec leur date et l'heure.

### Organisation

Le chocolatier possède une liste de pâtisseries de la plus à la moins sophistiquée. Les données sont enregistrées dans une base de données MongoDB.

Chaque pâtisserie gagnée dans le jeu est enregistré en base; à chaque fois que l'on cliquera sur "jouer" on regardera si la combinaison est gagnante. 

Si elle est gagnante on respectera les combinaisons suivantes :

- Yams correspond à 3 pâtisseries gagnées au hasard. Un Yams : 5 dés identiques.

- Un carré correspond à 2 pâtisseries gagnées au hasard. Un carré : 4 dés identiques parmi les 5.

- Un double (double paire) correspond à 1 pâtisserie gagnée au hasard. Un double : c'est deux fois 2 dés identiques parmi les 5.

Vous devez prendre en compte ce fichier pour concevoir le jeu.

### Pages à créer

L'application aura une page principale constituée d'une page du jeu et d'une page présentant le nombre de pâtisseries gagnées ainsi que le jour/heure/minutes/secondes.

### Page principale 

- Page du jeu on lance les 5 dés et on affiche les combinaisons.

```text

[Jouer]

1 2 2 5 1 

Affichez les pâtisserie(s) gagnée(s) 

- Biroche sucrée

```

Dans le lancer ci-dessus on a 2 combinaisons gagnantes, on retirera donc une pâtisserie au hasard dans la liste des pâtisserie.


- Page des pâtisseries gagnées :

Vous afficherez les pâtisseries gagnées ainsi que le jour, l'heure, le(s) minute(s) et le(s) seconde(s).

```text

Fondant supreme

Cake tout Chocolat 10 

```

## Options possible

Créez une page d'inscription avant le jeu. 

## Annexes données 

Vous partirez de la structure des données suivantes libre à vous de la modifier pour l'adapter à l'exercice.

```js
"patries" : [
        { "name" : "Fondant supreme" , "number" : 10, "combinations" : [], "order" : 1 },
        { "name" : "Cake tout Chocolat", "number" : 10,  "combinations" : [], "order" : 2},
        { "name" : "Cake Framboise chocolat", "number" : 10, "combinations" : [], "order" : 3},
        { "name" : "Brioche sucrée avec chocolat", "number" : 10, "combinations" : [], "order" : 4},
        { "name" : "Cake glacé fondant au chocolat", "number" : 10, "combinations" : [], "order" : 5},
        { "name" : "Eclairs au chocolat", "number" : 10, "combinations" : [], "order" : 6},
        { "name" : "Tarte poire chocolat", "number" : 10, "combinations" : [], "order" : 7},
        { "name" : "Banana  au chocolat", "number" : 10, "combinations" : [], "order" : 8}
    ]
}

```

## Options 

Si vous pensez à des améliorations du jeu écrivez les avant de les implémenter et demander à votre formateur de les valider avec vous.