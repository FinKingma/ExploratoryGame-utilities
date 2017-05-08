#!/bin/bash
docker stop etg-front
docker rm etg-front
docker build -t etg-front .
docker run --name etg-front -d -P --link etg-mapmaker:mapmaker etg-front