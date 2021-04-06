<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BarController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this->render('bar/index.html.twig');
    }

    /**
     * @Route("/mention", name="mention")
     */
    public function mention()
    {
        return $this->render('mention/index.html.twig');
    }
}
