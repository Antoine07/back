# TP 

Vous avez toute la matinée pour essayer de réaliser à partir du projet Bar les features suivantes. Vous pouvez vous mettre en groupe de 2 à 3 personnes pour réaliser ce qui est demandé.

Si vous savez le faire créer un dépôt afin que votre formateur puisse faire la correction de votre projet.

La partie Statistiques est facultative, mais si vous avez le temps essayer de la mettre en place.

## Catégories

1. Modifiez l'entité Category et ajoutez un champ "term", par défaut ce champ est "normal".

Créez les catégories suivantes, chaque bière aura une catégorie "normal" et au moins une catégorie spéciale :

```php
// catégories normals
$categoriesNormals = ['blonde', 'brune', 'blanche'];

// catégories specials
$categoriesSpecials = ['houblon', 'rose', 'menthe', 'grenadine', 'réglisse', 'marron', 'whisky', 'bio'] ;

```

Créez ces catégories et associées ces catégories aux bières déjà créés à l'aide de votre AppFixtures. Mettez à jour les données.

Vous allez créer maintenant dans le repository CategoryRepository une méthode findByTerm, elle permettra de récupérer les catégories selon leur terme propre.

Affichez pour l'instant dans un dump dans la méthode showBeer les catégories spéciales et normales comme suit :

```php
class BarController extends AbstractController
{

     /**
     * @Route("/beer/{id}", name="show_beer")
     */
    public function showBeer(int $id)
    {
        $repository = $this->getDoctrine()->getRepository(Beer::class);
        $beer = $repository->find($id);

        $repositoryCategory = $this->getDoctrine()->getRepository(Category::class);
        dump($repositoryCategory->findByTerm('special'));
        dump($repositoryCategory->findByTerm('normal'));

        return $this->render('home/single.html.twig', [
            'beer' => $beer,
            'title' => "Page de la bière {$beer->getName()}"
        ]);
    }
}
```

2. Affichez maintenant les catégories spéciales uniquement (faites une condition) de chacune des bières sous chaque bière dans la page d'une bière ainsi que sur la page home.

## Main menu

Nous allons utilisez un helper dans Twig pour afficher le menu principal. Ainsi dans le template base.html.twig vous allez écrire, à la place de l'include Twig déjà en place qui importe le menu, le helper suivant qui appelera une méthode publique **mainMenu** (BarController). Elle retournera le menu principal, notez également que l'argument **routeName** vous permettra de récupérer le nom de la route dans votre menu.html.twig. 

```php
{{render(controller('App\\Controller\\BarController:mainMenu',
  {
    'routeName' : app.request.attributes.get('_route')
}))}}

```

Dans votre BarController vous écrirez la méthode mainMenu comme suit :

```php

public function mainMenu( string $routeName ) {

}

```

*Remarques: dans la méthode mainMenu vous devez récupérez les catégories "normales" et les passer à la vue.*

## Affichez les bières par catégorie

Vous allez maintenant affichez les bières par catégorie, en effet, dans le menu principal vous créez les liens vers les catégories affichant les bières de cette catégorie (catégories normales).

Menu principale avec les catégories principales, retirez le lien Beers dans le menu pour faire de la place pour les autres catégories.

```text
---------------------------------------------------
Home Belgium French English Germany Mentions légales
---------------------------------------------------

```

Ajoutez category_id dans le render de votre Helper menu permettant d'afficher le menu dans base.html.twig, il permettra la gestion des liens actifs.

```php
{{render(controller('App\\Controller\\BarController:mainMenu',
  {
    'routeName' : app.request.attributes.get('_route'),
    'category_id' : app.request.attributes.get('id') ?? ''  // <-- id des catégories pour la classe active
}))}}
```

## Statistiques 

*Dans la suite vous pouvez utiliser une feuille de papier pour modéliser les relations.*

Vous allez implémenter une nouvelle entité Client elle permettra de faire un peu de statistiques sur la consommation de bière(s) des clients. Cette table nous renseignera plus précisément sur la consommation de nos clients. Un client peut consommer plusieurs types de bières. Nous essayerons de regrouper ces informations sous forme d'un tableau sur une page de notre application.

Essayez de concevoir une entité Statistic qui permettra de regrouper les informations liées à la consommation de bière de nos clients, puis faites un schéma permettant de représenter ces relations.

Pour terminez nous aimerions également calculer les prix dépensés par nos clients pour l'achat de leurs bières.

### Intérêt et âge (**)

Vous avez maintenant deux autres informations à gérer : chaque bière est notée par vos clients à l'aide d'un nouveau champ dans la table bière nommé **score**. D'un autre côté vous connaissez l'âge de chaque client (nouveau champ age à créer dans la table Client).

Modifiez les tables existantes en conséquence. Puis créez un nouveau tableau dans la partie statistique de notre application mettant en relation l'âge du client et le score qu'il a attribué à une bière donnée.

Pour vous aidez dans la réalisation de cette nouvelle fonctionnalité dans l'application nous vous proposons le schéma UML suivant :

![database schema](images/simplebar_03.png)
