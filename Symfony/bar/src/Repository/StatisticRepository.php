<?php

namespace App\Repository;

use App\Entity\Statistic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Statistic|null find($id, $lockMode = null, $lockVersion = null)
 * @method Statistic|null findOneBy(array $criteria, array $orderBy = null)
 * @method Statistic[]    findAll()
 * @method Statistic[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StatisticRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Statistic::class);
    }

    // /**
    //  * @return Statistic[] Returns an array of Statistic objects
    //  */
  
    public function findNumberBeer(int $clientId)
    {
        return $this->createQueryBuilder('s')
            ->select('sum(s.number_beer) as nb')
            ->andWhere('s.client = :clientId')
            ->setParameter('clientId', $clientId)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function findTotalPrice(int $clientId)
    {
        return $this->createQueryBuilder('s')
            ->select('sum(s.total_price) as nb')
            ->andWhere('s.client = :clientId')
            ->setParameter('clientId', $clientId)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    // TODO : à utiliser dans le projet 
    public function scores(int $clientId)
    {
        return $this->createQueryBuilder('s')
            ->select('s.score')
            ->andWhere('s.client = :clientId')
            ->setParameter('clientId', $clientId)
            ->getQuery()
            ->getArrayResult()
        ;
    }

    /*
    public function findOneBySomeField($value): ?Statistic
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
