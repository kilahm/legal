<?php

require __DIR__ . '/vendor/autoload.php';

$networkProc = new \Symfony\Component\Process\Process(
    <<<SH
docker network create --internal minutes-integration
SH
);
$networkProc->mustRun()->wait();
$dbProc = new \Symfony\Component\Process\Process(
    <<<SH
docker run \
  --network=minutes-integration \
  --network-alias=db \
  --rm \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=minutes \
  postgres:9-alpine
SH
);
$dbProc->mustRun()->wait();


