#!/bin/bash

docker stop etg-pactmock
docker rm etg-pactmock

docker build -t etg-pactmock .
docker run --name etg-pactmock -d -p 1234:1234 etg-pactmock