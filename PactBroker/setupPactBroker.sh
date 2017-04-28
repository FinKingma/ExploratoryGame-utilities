#!/bin/bash

docker stop etg-pactbroker
docker rm etg-pactbroker

docker build -t etg-pactbroker .
docker run --name etg-pactbroker -d -p 3000:3000 etg-pactbroker