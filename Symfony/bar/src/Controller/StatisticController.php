<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\Statistic;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StatisticController extends AbstractController
{
    /**
     * @Route("/statistic", name="statistic")
     */
    public function index(Request $request, PaginatorInterface $paginator): Response
    {
        $clientRepo =  $this->getDoctrine()->getRepository(Client::class);

        $clients = $paginator->paginate(
            $clientRepo->findAll(), // Requête contenant les données à paginer (ici nos articles)
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            5 // Nombre de résultats par page
        );

        return $this->render('statistic/index.html.twig', [
            'clients' =>  $clients
        ]);
    }

    /**
     * @Route("/detail/{clientId}", name="show_details")
     */
    public function showDetails(int $clientId): Response
    {
        $statRepo = $this->getDoctrine()->getRepository(Statistic::class);
        $clientRepo =  $this->getDoctrine()->getRepository(Client::class);

        return $this->render('statistic/single.html.twig', [
            'client' =>  $clientRepo->find($clientId),
            'number_beer' =>  $statRepo->findNumberBeer($clientId)['nb'] ?? 0,
            'total_price' =>  $statRepo->findTotalPrice($clientId)['nb'] ?? 0,
            'statistics' => $statRepo->findBy(['client' => $clientId]),
            'title' => 'Page stat client'
        ]);
    }
}
