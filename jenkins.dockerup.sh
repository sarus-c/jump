#!/usr/bin/env bash

function main {
  echo "Found Jenkins image"

  # Pull the latest docker images
  docker-compose pull
  docker-compose up -d
}

main
