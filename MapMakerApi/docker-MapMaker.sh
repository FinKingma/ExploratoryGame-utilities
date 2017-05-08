#!/bin/bash
docker stop etg-mapmaker
docker rm etg-mapmaker
docker build -t etg-mapmaker .
docker run --name etg-mapmaker -d -P etg-mapmaker