<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class Helper extends AbstractExtension
{
    public function getFilters()
    {
        return [
            new TwigFilter('avg', [$this, 'formatAvg']),
        ];
    }

    public function formatAvg(array $numbers): float
    {

        if (count($numbers) > 0) return round(array_sum($numbers) / count($numbers), 1);
    }
}
