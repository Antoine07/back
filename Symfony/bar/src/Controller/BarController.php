<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Contracts\HttpClient\HttpClientInterface;

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
}
