# Complément sur Doctrine et les entités

## Création des countries

Dans AppFixtures créez des pays, voir la liste ci-dessous, puis en utilisant setCountry de Beer essayez d'associer un pays à une bière :

```php
$countries = ['belgium', 'french', 'English', 'germany'];
```

## Routes beer

1. Rendez cliquable chaque bière (le nom de la bière et l'image) et affichez le détail d'une bière dans une page HTML/CSS de votre choix (bootstrap Twitter). Dans cette page affichez tous les détails d'une bière ainsi que sa description et son pays (pas d'abstract).

Vous devez créer une méthode dans votre contrôleur BarController pour afficher une bière.

```text

     Menu principal
------------------------------------

    Name : beer super
    prix : 12
    degre : 7
    date de création : 01-02-2001 
    description : loremp ...
    pays: French
```

Aidez-vous des exemples de code suivants :

```html
{#
Twig
Votre url aura la forme suivante : http://localhost:8000/country/1
notez que country_beer est le nom de votre route (voir les annotations)
#}
{% if beer.country %}
    <a href="{{ path('beer', { 'id' : beer.id }) }}">
        {{ beer.name }}
    </a>
{% endif %}
```

Pour récupérer une bière à l'aide du repository de la bière vous utiliserez la méthode find pour récupérer l'entité hydraté Beer correspondant.

2. Ajoutez un lien dans le code Twig de la page d'accueil pour accéder à la page affichant les bières d'un pays (utilisez la même mise en page que la page d'accueil pour afficher les bières). Les liens sont à placer dans la card affichant le détail d'une bière avec son abstract. Vous afficherez ce lien pour chaque bière (si la bière est associé à un pays).

Vous devez créer une action (méthode), par exemple showCountryBeer, dans le contrôleur BarController. Attention cette méthode possède un paramètre qui est techniquement l'identifiant unique correspondant au pays.

Pour le lien vous utiliserez le helper de Symfony "path" de la manière suivante :

```html
{#
Twig
Votre url aura la forme suivante : http://localhost:8000/country/1
notez que country_beer est le nom de votre route (voir les annotations)
#}
{% if beer.country %}
    <a href="{{ path('country_beer', { 'id' : beer.country.id }) }}">
        {{ beer.country.name }}
    </a>
{% endif %}
```

## Catégories

Modifiez l'entité Category et ajoutez un champ "term", par défaut ce champ est "normal".

Créez les catégories suivantes, chaque bière aura une catégorie "normal" et au moins une catégorie spéciale :

```php
// catégories normals
$categoriesNormals = ['blonde', 'brune', 'blanche'];

// catégories specials
$categoriesSpecials = ['houblon', 'rose', 'menthe', 'grenadine', 'réglisse', 'marron', 'whisky', 'bio'] ;

```

Créez ces catégories et associées ces catégories aux bières déjà créés à l'aide de votre AppFixtures. Mettez à jour les données.

Vous allez créer maintenant dans le repository CategoryRepository une méthode findByTerm, elle permettra de récupérer les catégories selon leur terme propre.

Affichez pour l'instant dans un dump dans le constructeur du Controller BarController pour vérifier que vous récupérez bien ces catégories.

```php
class BarController extends AbstractController
{

    public function __construct()
    {
        $repository = $this->getDoctrine()->getRepository(Beer::class);
        dump($repository->findByTerm('special'));
    }

    //...
}
```

## Main menu

Nous allons utilisez un helper dans Twig pour afficher le menu principal. Ainsi dans le template base.html.twig vous allez écrire, à la place de l'include Twig déjà en place, qui vous supprimez, le helper suivant qui appelera une méthode publique **mainMenu**. Elle retournera le menu principal :

```php
{{render(controller('App\\Controller\\BarController:mainMenu',
  {
    'routeName' : app.request.attributes.get('_route')
}))}}

```

*Remarques: dans la méthode mainMenu vous devez récupérez les catégories "normales" et les passer à la vue.*

## Affichez les bières par catégorie

Vous allez maintenant affichez les bières par catégorie, en effet, dans le menu principal vous créez les liens vers les catégories affichant les bières de cette catégorie.

## TP synthèse facultatif

*Dans la suite vous pouvez utiliser le logiciel Dia pour modèliser les relations entre les tables.*

Vous allez implémenter une nouvelle entité Client elle permettra de faire un peu de statistique sur la consommation de bière(s) des clients. Cette table nous renseignera plus précisémenet sur le poids et la consommation de nos clients. Un client peut consommer plusieurs types de bières. Nous essayerons de regrouper ces informations sous forme d'un tableau sur une page de notre application.

Essayez de concevoir une entité Statistic qui permettra de regrouper les informations liées à la consommation de bière de nos clients, puis faites un schéma permettant de représenter ces relations.

Pour terminez nous aimerions également calculer les prix dépensés par nos clients pour l'achat de leurs bières.

### Intérêt et âge

Vous avez maintenant deux autres informations à gérer : chaque bière est notée par vos clients à l'aide d'un nouveau champ dans la table bière nommé **score**. D'un autre côté vous connaissez l'âge de chaque client (nouveau champ age à créer dans la table Client).

Modifiez les tables existantes en conséquence. Puis créez un nouveau tableau dans la partie statistique de notre application mettant en relation l'âge du client et le score qu'il a attribué à une bière donnée.

Pour vous aidez dans la réalisation de cette nouvelle fonctionnalité dans l'application nous vous proposons le schéma UML suivant :

![database schema](images/simplebar_03.png)
