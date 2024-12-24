.DEFAULT_GOAL = help
SHELL := /bin/bash
VENDOR_DIR := vendor/react-notion-x

# https://supabase.com/docs/guides/local-development/overview#database-migrations
# https://supabase.com/docs/guides/local-development/seeding-your-database
# https://supabase.com/docs/guides/self-hosting/docker
# https://supabase.com/docs/reference/javascript/typescript-support?queryGroups=platform&platform=pnpm

# Load environment variables from .env
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

##=============================================================================
##@ Repo Initialization
##=============================================================================

PLUGINS := \
	direnv https://github.com/asdf-community/asdf-direnv.git \
	pre-commit https://github.com/jonathanmorley/asdf-pre-commit.git \
	nodejs https://github.com/asdf-vm/asdf-nodejs.git \
	pnpm https://github.com/jonathanmorley/asdf-pnpm.git \
	yarn https://github.com/twuni/asdf-yarn.git \
	terraform https://github.com/asdf-community/asdf-hashicorp.git

prerequisites: ## Install prerequisite tools
	@echo "Checking and installing required plugins."
	@echo "${PLUGINS}" | tr ' ' '\n' | paste - - | while read -r plugin url; do \
		if asdf plugin-list | grep -q $$plugin; then \
			echo "Plugin '$$plugin' is already installed."; \
		else \
			echo "Adding plugin '$$plugin'."; \
			asdf plugin-add $$plugin $$url; \
		fi; \
	done
	@echo  "Installing specified versions."
	asdf install
	@echo  "Currently installed versions:"
	asdf current
.PHONY: prerequisites

env: ## Create .env file if it doesn't exist
	@if ! [ -e .env ]; then \
		cp .env.example .env; \
		echo "Created .env file. Please edit it according to your setup."; \
	fi
.PHONY: env

deps-notion: ## Install dependencies for react-notion-x
	@echo "Installing dependencies for react-notion-x."
	@git submodule update --init --recursive
	@cd ${VENDOR_DIR} && yarn install --frozen-lockfile
.PHONY: deps-notion

deps: deps-notion ## Install repo dependencies
	@echo "Installing dependencies."
	@pnpm install
.PHONY: deps

deps-prod: deps-notion ## Install production dependencies
	@echo "Installing production dependencies."
	@pnpm install --frozen-lockfile
.PHONY: deps-prod

pre-commit: ## Install pre-commit hooks
	@echo "Installing pre-commit hooks."
	@pre-commit install -t pre-commit -t commit-msg
.PHONY: pre-commit

init: prerequisites env deps pre-commit ## Initialize local environment for development
.PHONY: init

##=============================================================================
##@ Scripts
##=============================================================================

build-notion: ## Build react-notion-x
	@echo "Building react-notion-x."
	@cd ${VENDOR_DIR} && yarn build
.PHONY: build-notion

build: build-notion ## Build project
	@echo "Building project."
	@pnpm run build
.PHONY: build

run-dev: ## Run development server
	@echo "Running development server."
	@pnpm run dev
.PHONY: run-dev

run-prod: build ## Run production server
	@echo "Starting server."
	@pnpm run start
.PHONY: run-prod

lint: ## Lint project
	@echo "Linting project."
	@pnpm run lint && pnpm run stylelint && pnpm run typecheck
.PHONY: lint

format: ## Format project
	@echo "Formatting project."
	@pnpm run format
.PHONY: format

ngrok-dev: ## Run ngrok for development server
	@echo "Running ngrok."
	@ngrok http 5173
.PHONY: ngrok-dev

ngrok-prod: ## Run ngrok for production server
	@echo "Running ngrok."
	@ngrok http 55203
.PHONY: ngrok-prod

##=============================================================================
##@ Supabase
##=============================================================================

supabase-start: ## Start supabase containers
	@echo "Starting supabase."
	@docker compose --file supabase/docker-compose.yaml up --detach
	@echo "PG Connection URI: ${POSTGRES_URI}"
	@echo
	@echo "JWT Secret: ${JWT_SECRET}"
	@echo "Anon Key: ${ANON_KEY}"
	@echo "Service Key: ${SERVICE_ROLE_KEY}"
	@echo
	@echo "API Server: http://localhost:${KONG_HTTP_PORT}/rest/v1/"
	@echo "Supabase Studio: http://localhost:${STUDIO_PORT}"
.PHONY: supabase-start

supabase-stop: ## Stop supabase containers
	@echo "Stopping supabase."
	@docker compose --file supabase/docker-compose.yaml down
.PHONY: supabase-stop

supabase-drop: ## Drop supabase database
	@echo "Dropping supabase database."
	@docker compose --file supabase/docker-compose.yaml down --volumes --remove-orphans
.PHONY: supabase-drop

supabase-show-config: ## Show supabase config
	@echo "Showing supabase config."
	@docker compose config
.PHONY: supabase-show-config

##=============================================================================
##@ Miscellaneous
##=============================================================================

create-secrets-baseline: ## Create secrets baseline file
	@detect-secrets scan > .secrets.baseline
.PHONY: create-secrets-baseline

audit-secrets-baseline: ## Check updated .secrets.baseline file
	@detect-secrets audit .secrets.baseline
	@git commit .secrets.baseline --no-verify -m "build(security): update secrets.baseline"
.PHONY: audit-secrets-baseline

update-pre-commit-hooks: ## Update pre-commit hooks
	@pre-commit autoupdate
.PHONY: update-pre-commit-hooks

clean: ## Clean project
	@echo "Cleaning project."
	@rm -rf node_modules build
	@find ${VENDOR_DIR} -type d -name 'build' -exec rm -rf {} +
	@find ${VENDOR_DIR} -type d -name 'node_modules' -exec rm -rf {} +
.PHONY: clean

##=============================================================================
##@ Helper
##=============================================================================

help: ## Display help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.PHONY: help
