<?php

namespace App\DataFixtures;

use App\Entity\Beer;
use App\Entity\Country;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use Faker;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        $countries = ['belgium', 'french', 'English', 'germany'];

        foreach($countries as $name){
            $country = new Country;
            $country->setName($name);

            $manager->persist($country);
        }

        $manager->flush();

        $names = [
            'beer super',
            'beer cool',
            'beer strange',
            'beer super strange',
            'beer very strong',
            'beer hyper cool',
            'beer simple',
            'beer very cool',
            'beer 8 degree',
            'beer super degree',
            'beer sweet',
            'beer very sweet',
            'beer normal',
        ];


        $repository= $manager->getRepository(Country::class);
        $countries = $repository->findAll();

        $count = 0;
        while($count < 20){
            $beer = new Beer;
            $beer->setName( $names[rand(0, count($names) - 1) ]);
            $beer->setAbstract($faker->paragraph(rand(2, 3)));
            $beer->setDescription( $faker->paragraph(rand(10, 20)) );
            $date = new \DateTime('2000-01-01');
            $day = random_int(10, 2500);
            $date->add(new \DateInterval("P".$day."D"));
            $beer->setPublishedAt($date);
            $beer->setPrice(rand(5, 20));
            $beer->setDegree(rand(5, 12));
            if( rand(0,6) < 5 )
                $beer->setCountry($countries[rand(0, count($countries) - 1)]);

            $manager->persist($beer); // 1. ce n'est effectif au niveau de l'insert ceci peut être défait, on peut revenir en arrière
            $count++;
        }


        $manager->flush(); // 2. effectif l'insert est fait on ne peut pas revenir en arrière

        // 1 + 2 => mode transactionnel dans les bases de données relationnelles
    }
}
