#!/bin/bash

docker stop etg-pactbroker
docker rm etg-pactbroker

docker build -t etg-pactbroker .
docker run --name etg-pactbroker -d -p 8080:8080 etg-pactbroker

export pactbrokerurl=($(docker-machine ip test):8080)