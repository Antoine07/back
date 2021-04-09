<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Contracts\HttpClient\HttpClientInterface;

use App\Entity\Beer;
use App\Entity\Category;
use App\Entity\Country;

class BarController extends AbstractController
{

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    /**
     * @Route("/menu", name="menu")
     */
    public function mainMenu(string $routeName, string $category_id): Response
    {
        $catRepo = $this->getDoctrine()->getRepository(Category::class);

        return $this->render('partials/menu.html.twig', [
            'title' => "Page d'accueil",
            'categories' => $catRepo->findByTerm('normal'),
            'route_name' => $routeName,
            'category_id' => $category_id
        ]);
    }

    /**
     * @Route("/", name="home")
     */
    public function index()
    {

        $repository = $this->getDoctrine()->getRepository(Beer::class);

        return $this->render('home/index.html.twig', [
            'beers' => $repository->findAll(),
            'title' => 'Page principale'
        ]);
    }

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

    /**
     * @Route("/country/{id}", name="show_country_beers")
     */
    public function showCountryBeer(int $id)
    {
        $repository = $this->getDoctrine()->getRepository(Country::class);

        $country = $repository->find($id);

        return $this->render('country/index.html.twig', [
            'beers' => $country->getBeers(),
            'title' => $country->getName()
        ]);
    }

    /**
     * @Route("/mention", name="mention")
     */
    public function mention()
    {
        return $this->render('mention/index.html.twig');
    }

    /**
     * @Route("/category/{id}", name="show_category_beers")
     */
    public function showCategory(int $id)
    {
        $catRepo = $this->getDoctrine()->getRepository(Category::class);
        $category = $catRepo->find($id);

        return $this->render('category/index.html.twig', [
            'title' => $category->getName(),
            'beers' => $category->getBeers(),
        ]);
    }

    /**
     * @Route("/beers", name="beers")
     */
    public function beers()
    {
        $repository = $this->getDoctrine()->getRepository(Beer::class);

        return $this->render(
            'beers/index.html.twig',
            [
                'beers' => $repository->findAll(),
                'title' => 'Page beers'
            ]
        );
    }

    private function beers_api(): array
    {
        $response = $this->client->request(
            'GET',
            'https://raw.githubusercontent.com/Antoine07/hetic_symfony/main/Introduction/Data/beers.json'
        );

        $statusCode = $response->getStatusCode();
        // $statusCode = 200
        $contentType = $response->getHeaders()['content-type'][0];
        // $contentType = 'application/json'
        $content = $response->getContent();
        // $content = '{"id":521583, "name":"symfony-docs", ...}'
        $content = $response->toArray();
        // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]

        return $content;
    }

    /**
     * @Route("/newbeer", name="create_beer")
     */
    public function createBeer()
    {
        $entityManager = $this->getDoctrine()->getManager();

        // création d'une entité
        $beer = new Beer();
        // hydratation de l'entité
        $beer->setname('Super Beer');
        $beer->setPublishedAt(new \DateTime());
        $beer->setDescription('Ergonomic and stylish!');

        // mode transaction => on peut toujours revenir en arrière, base de données relationnelles
        // 1. tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($beer);

        // 2. actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new beer with id ' . $beer->getId());
    }

    /**
     * @Route("/newcat", name="create_category")
     */
    public function createCategory()
    {
        $entityManager = $this->getDoctrine()->getManager();

        // création d'une entité
        $category = new Category();
        // hydratation de l'entité
        $category->setname('Houblon');
        $category->setDescription('Ergonomic and stylish!');

        // mode transaction => on peut toujours revenir en arrière, base de données relationnelles
        // 1. tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($category);

        // 2. actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new category with id ' . $category->getId());
    }

    /**
     * @Route("/newcatbeer", name="create_category_beer")
     */
    public function createCategoryBeer()
    {
        $entityManager = $this->getDoctrine()->getManager();

        // de faire des requêtes SQL sur les tables en PHP
        $beerRepo = $entityManager->getRepository(Beer::class);

        // récupérer toutes les bières avec le repository
        // dd($beerRepo->findAll());

        // création d'une entité
        $category = new Category();
        // hydratation de l'entité
        $category->setname('blonde');
        $category->setDescription('bière blonde');

        foreach ($beerRepo->findAll() as $beer)
            $category->addBeer($beer);

        $entityManager->persist($category);

        $entityManager->flush();


        return new Response('Saved new category with id ');
    }

    /**
     * @Route("/seeds", name="seeds")
     */
    public function createSeeds()
    {
        $entityManager = $this->getDoctrine()->getManager();
        $categories = ['Brune', 'Chataigne', 'Houblon', 'Poivré'];

        foreach ($categories as $cat) {
            $category = new Category();
            $category->setName($cat);
            $entityManager->persist($category);

            $entityManager->flush();
        }

        $categoryRepo = $entityManager->getRepository(Category::class);

        $beer = new Beer();
        $beer->setname('Ardèche');
        $beer->setPublishedAt(new \DateTime());
        $beer->setDescription('Bière d\'Ardèche');

        foreach ($categories as $cat) {
            $category = $categoryRepo->findOneBy(['name' => $cat]);
            $beer->addCategory($category); // on ajoute l'objet
        }

        $entityManager->persist($beer);

        $entityManager->flush();

        dump($beer->getCategories(), 'ici');

        return new Response('Saved new category with id ' . $beer->getId());
    }
}
