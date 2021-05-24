#!/usr/bin/env bash

function main {
  echo "Found MongoDB image"

  echo "Found Services image"

  echo "Found Back End image"

  echo "Found Front End image"

  # Pull the latest docker images
  docker-compose pull
  docker-compose up -d
}

main
