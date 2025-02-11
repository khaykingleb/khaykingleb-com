.DEFAULT_GOAL = help
SHELL := /bin/bash
VENDOR_DIR := vendor/react-notion-x

# Load environment variables from .env
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

##=============================================================================
##@ Repo Initialization
##=============================================================================

prerequisites: ## Install prerequisite tools
	@echo  "Installing specified runtime versions."
	@asdf install
	@echo  "Currently installed runtime versions:"
	@asdf current
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

deps-dev: deps-notion ## Install development dependencies
	@echo "Installing development dependencies."
	@pnpm install
.PHONY: deps-dev

deps-prod: deps-notion ## Install production dependencies
	@echo "Installing production dependencies."
	@pnpm install --frozen-lockfile
.PHONY: deps-prod

pre-commit: ## Install pre-commit hooks
	@echo "Installing pre-commit hooks."
	@pre-commit install -t pre-commit -t commit-msg
.PHONY: pre-commit

init: prerequisites env deps-dev pre-commit ## Initialize local environment for development
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

##=============================================================================
##@ Supabase
##=============================================================================

supabase-start: ## Start supabase containers
	@echo "Starting supabase."
	@supabase start
.PHONY: supabase-start

supabase-status: ## Check supabase status
	@echo "Checking supabase status."
	@supabase status
.PHONY: supabase-status

supabase-reset: ## Reset supabase database (runs migrations and seeds)
	@echo "Resetting supabase database."
	@supabase db reset
.PHONY: supabase-reset

supabase-migration-%: ## Create supabase migration
	@echo "Creating custom migration: supabase/migrations/some_timestamp_$*.sql"
	@supabase db diff --use-migra -f $*
.PHONY: supabase-migration-%

supabase-generate-types: ## Generate supabase types
	@echo "Generating supabase types."
	@supabase gen types typescript --local > app/integrations/supabase/database.types.ts
.PHONY: supabase-generate-types

supabase-stop: ## Stop supabase containers
	@echo "Stopping supabase."
	@supabase stop
.PHONY: supabase-stop

#==============================================================================
##@ Ngrok
##==============================================================================

ngrok-dev: ## Run ngrok for development server
	@echo "Running ngrok."
	@ngrok http 5173
.PHONY: ngrok-dev

ngrok-prod: ## Run ngrok for production server
	@echo "Running ngrok."
	@ngrok http 55203
.PHONY: ngrok-prod

#==============================================================================
##@ Security
##==============================================================================

detect-secrets-create-baseline: ## Create secrets baseline file
	@detect-secrets scan > .secrets.baseline
.PHONY: detect-secrets-create-baseline

detect-secrets-audit-baseline: ## Check updated .secrets.baseline file
	@detect-secrets audit .secrets.baseline
.PHONY: detect-secrets-audit-baseline

detect-secrets-scan: ## Scan for secrets
	@detect-secrets scan --baseline .secrets.baseline
.PHONY: detect-secrets-scan

##=============================================================================
##@ Miscellaneous
##=============================================================================

pre-commit-update-hooks: ## Update pre-commit hooks
	@pre-commit autoupdate
.PHONY: pre-commit-update-hooks

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
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} \
	/^[a-zA-Z_-]+%?:.*?##/ { printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2 } \
	/^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.PHONY: help
