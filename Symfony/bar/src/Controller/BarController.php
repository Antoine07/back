<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Contracts\HttpClient\HttpClientInterface;

use App\Entity\Beer;
use App\Entity\Category;

class BarController extends AbstractController
{

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        // var_dump de symfony
        // dd([
        //     'b1' => 1,
        //     'b2' => 2,
        //     'b3' => 3
        // ]);

        // dump([
        //     'b1' => 1,
        //     'b2' => 2,
        //     'b3' => 3
        // ]);

        return $this->render('bar/index.html.twig', [
            'beers' => [
                'b1' => 1,
                'b2' => 2,
                'b3' => 3
            ],
            'title' => 'Page principale'
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
     * @Route("/beers", name="beers")
     */
    public function beers()
    {
        // dd($this->beers_api()['beers']);

        return $this->render(
            'beers/index.html.twig',
            [
                'beers' => $this->beers_api()['beers'],
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

        foreach($beerRepo->findAll() as $beer)
            $category->addBeer($beer);

        $entityManager->persist($category);

        $entityManager->flush();


        return new Response('Saved new category with id ');
    }
}
