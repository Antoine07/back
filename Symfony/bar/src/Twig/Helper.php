<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class Helper extends AbstractExtension
{
    public function getFilters()
    {
        return [
            // en premier paramètre le nom de la fonction pipe à utiliser dans la vue
            new TwigFilter('avg', [$this, 'formatAvg']),
        ];
    }

    // fonction logique métier 
    //  Dans Twig vous écrirez ceci [19, 18, 19] | avg 
    public function formatAvg(array $numbers): float
    {

        if (count($numbers) > 0) return round(array_sum($numbers) / count($numbers), 1);
    }
}
