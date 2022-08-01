.DEFAULT_GOAL := help

GET_MAKEFILE_LIST := $(MAKEFILE_LIST)

RED=\033[31m
CYAN=\033[36m
YELLOW=\033[33m
GREEN=\033[32m
DEFAULT=\033[0m

OS := $(shell uname)
VENDOR := ./vendor/bin

DOCKER := true
DOCKER_NETWORK := host # options: host or bridge
DOCKER_TTY := it
ifeq ($(DOCKER),true)
	DOCKER_COMMAND := docker run -${DOCKER_TTY} --rm --volumes-from ts-data --net=${DOCKER_NETWORK} --init ts-development
else
	DOCKER_COMMAND :=
endif

.PHONY: help
help:
	@echo 'To install the development environment use: make install'
	@echo ''
	@echo 'To run a task: make [task_name] ARGS=[your-arguments]'
	@echo "\t${YELLOW}Example${DEFAULT}: make test_acceptance ARGS='-g debug -vvv' ENV=production"
	@echo ''
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(GET_MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%s%-30s%s %s\n", "${CYAN}", $$1, "${DEFAULT}",$$2}'

.PHONY: start_containers
start_containers: ## Start Docker containers after eg. a restart of your computer.
	docker-compose up -d --build

.PHONY: install
install: ## Install the development environment
	./scripts/install-development

.PHONY: start
start: ## Start the development environment
	npm run dev
