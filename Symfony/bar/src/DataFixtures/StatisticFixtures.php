<?php

namespace App\DataFixtures;

use Faker;
use App\Entity\Client;
use App\Entity\Statistic;
use App\Entity\Beer;

use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class StatisticFixtures extends Fixture implements DependentFixtureInterface
{
    const NB_CLIENT = 10;

    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        $count = 0;
        while ($count < self::NB_CLIENT) {
            $client = new Client();
            $client->setName($faker->firstName);
            $client->setEmail($faker->email);
            $client->setAge(random_int(18, 70));
            $manager->persist($client);

            $count++;
        }

        $manager->flush();

        $clients = $manager->getRepository(Client::class)->findAll();
        $beers = $manager->getRepository(Beer::class)->findAll();

        $count = 0;
        while ($count < self::NB_CLIENT) {
            $countBeer = 0;
            while ($countBeer < random_int(2, 7)) {
                $stat = new Statistic();
                $stat->setClient($clients[$count]);
                $beer = $beers[$countBeer];
                $stat->setBeer($beer);
                $stat->setScore(rand(0, 5));
                $nbBeers = rand(1, 10);
                $stat->setNumberBeer($nbBeers);
                $stat->setTotalPrice( $nbBeers * $beer->getPrice() );

                $date = new \DateTime('2000-01-01');
                $day = random_int(10, 2500);
                $date->add(new \DateInterval("P" . $day . "D"));
                $stat->setCreatedAt($date);

                $manager->persist($stat);
                $countBeer++;
            }

            $count++;
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            AppFixtures::class,
        ];
    }
}
