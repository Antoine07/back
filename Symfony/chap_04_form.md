# Formulaire Symfony

Tapez la ligne de commande suivante :

```bash
composer require symfony/form
```

Puis créez le contrôleur BeerController, nous allons créer dans ce contrôleur un formulaire pour ajouter une bière dans la base de données.

```bash
php bin/console make:controller BeerController
```

Notez que Symfony dans ce cas vous crée le contrôleur ainsi que la vue **index.html.twig** qu'il place dans le dossier templates

Nous allons préfixer les noms des routes par admin :

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin")
 */
class BeerController extends AbstractController
{
    /**
     * @Route("/beer", name="beer")
     */
    public function index()
    {
        return $this->render('beer/index.html.twig', [
            'controller_name' => 'BeerController',
        ]);
    }
}

```

## Validation des champs

Importez ce component pour valider les champs :

```bash
composer require symfony/validator doctrine/annotations
```

Vous allez créer un formulaire à l'aide de la commande suivante, appelez ce formulaire BeerType :

```bash

php bin/console make:form

```

Une fois votre formulaire créer celui-ci est placé dans le dossier Form dans src.

Pensez à commenter les deux champs correspondant au country et aux categories que nous traiterons plus tard.

Il faut maintenant importer votre formulaire dans une méthode de votre contrôleur BeerController, appelons cette méthode, par exemple, createBeer.

Cette méthode est particulière nous allons lui injecter la **Request** de Symfony pour récupérer les données du formulaire, pensez à créer le template create.html.twig :

```php

/**

* @Route("/beer/create", name="admin.create.beer", methods={"GET", "POST"})
*/
public function createBeer(Request $request){
    // ... création du formulaire

    $form = $this->createForm(BeerType::class, new Beer());

    // ...

    return $this->render('beer/create.html.twig', [
        'form' => $form->createView()
    ]);
}

// ...

```

**Bar défaut votre formulaire Symfony est en POST**.

Si vous voulez tester la validation côté serveur de votre formulaire vous pouvez désactiver la vérification des champs HTML5 :

```php
{{ form_start(form, {'attr': {'novalidate': 'novalidate'}}) }}
{{ form_widget(form) }}
{{ form_end(form) }}
```

Mais vous avez plusieurs techniques pour afficher le formulaire dans la vue :

```php
// Affiche le formulaire rapidement ...
{{ form(form) }}
```

Si on souhaite avoir le formulaire par champ :

```php
{{ form_start(form) }}
<div class="row">
    <div class="col-md-4">
        {{ form_row(form.title) }}
    </div>
</div>
{{ form_end(form) }}

```

## Ajoutez des styles au formulaire

On peut de manière spécifique définir des styles pour un formulaire, dans ce cas dans le template du formulaire on tapera au début en-dessous de l'extends du layout :

```php

{% form_theme form 'bootstrap_4_layout.html.twig' %}

```

Ou de manière plus générique on peut demander au framework d'utiliser le modèle Bootstrap_4 ci-dessus, dans ce cas c'est dans le fichier yaml de configuration suivant, **config/packages/twig.yaml** :

```yaml
twig:
    default_path: '%kernel.project_dir%/templates'
    debug: '%kernel.debug%'
    strict_variables: '%kernel.debug%'
    form_themes: ['bootstrap_4_layout.html.twig']
```

## Exercice ajouter une valeur

Vous pouvez par exemple définir une valeur par défaut à votre champ facilement en ajoutant dans l'entité et dans le constructeur une valeur. Faites le pour la date de publication d'une bière.

## Ajoutez maintenant la validation

Vous allez mettre en place les annotations Assert dans l'entité pour vérifier la validiter des champs saisies, vous pouvez le faire car vous avez déjà installer le component nécessaire voir plus dans ce document.

Vérifiez que le champ title n'est pas vide ou null, importez d'abord l'alias suivant dans l'entité Beer :

```php
use Symfony\Component\Validator\Constraints as Assert;
```

Voici un exemple pour qu'à la validation Symfony vérifie que le titre n'est pas une chaîne de caractères vide ou null, notez que les messages d'erreur sont intégrés dans l'exemple qui suit dans la partie message :

```php
/**
* @ORM\Column(type="string", length=100)
* @Assert\NotBlank(
*   message="Attention le titre doit être renseigné"
*   )
*/
private $title;
```

Dans votre contrôleur voici le code qu'il faudra mettre en place pour la validation, voyez le code et les commentaires :

```php
/**
* @Route("/beer/create",
* name="admin.create.beer",
* methods={"GET", "POST"}
* )
*/
public function createBeer(Request $request){

    $form = $this->createForm(BeerType::class, new Beer());

    // récupère la Request avec les données du form
    $form->handleRequest($request);

    // Si le formulaire a été envoyé et est valide
    if($form->isSubmitted() && $form->isValid()){

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($form->getData());
        $manager->flush();

        // redirection vers la page index en accord avec
        // les routes de votre projet
        return $this->redirectToRoute('admin.index.beer');

    }

    // si on n'a pas soumi le form on représente le form
    // avec éventuellement les messages d'erreurs
    return $this->render('beer/create.html.twig', [
        'form' => $form->createView()
    ]);

}
```