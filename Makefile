.DEFAULT_GOAL = help
SHELL := /bin/bash

# Load environment variables from .env
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

##=============================================================================
##@ Repo Initialization
##=============================================================================

prerequisites: ## Install prerequisite tools
	@printf "\nInstalling specified runtime versions:\n"
	@asdf install
	@printf "\nCurrently installed runtime versions:\n"
	@asdf current
.PHONY: prerequisites

env: ## Create .env file if it doesn't exist
	@if ! [ -e .env ]; then \
		cp .env.example .env; \
		echo "Created .env file. Please edit it according to your setup."; \
	fi
.PHONY: env

deps-dev: ## Install development dependencies
	@printf "\nInstalling development dependencies:\n"
	@pnpm install
.PHONY: deps-dev

deps-prod: ## Install production dependencies
	@printf "\nInstalling production dependencies:\n"
	@pnpm install --frozen-lockfile
.PHONY: deps-prod

pre-commit: ## Install pre-commit hooks
	@printf "\nInstalling pre-commit hooks:\n"
	@pre-commit install -t pre-commit -t commit-msg
.PHONY: pre-commit

init: prerequisites env deps-dev pre-commit ## Initialize local environment for development
.PHONY: init

##=============================================================================
##@ Scripts
##=============================================================================

build-react-notion-x:
	@printf "\nBuilding react-notion-x:\n"
	@pnpm --dir vendor/react-notion-x install
	@pnpm --dir vendor/react-notion-x build
.PHONY: build-react-notion-x

dev: build-react-notion-x ## Run development server
	@printf "\nRunning development server:\n"
	@pnpm dev
.PHONY: dev

build: build-react-notion-x ## Build application for production
	@printf "\nBuilding application for production:\n"
	@pnpm build
.PHONY: build

start: build ## Start production server
	@printf "\nStarting production server:\n"
	@pnpm start
.PHONY: start

lint: ## Run linting
	@printf "\nRunning linting:\n"
	@pnpm lint
.PHONY: lint

format: ## Run formatting
	@printf "\nRunning formatting:\n"
	@pnpm format
.PHONY: format

##=============================================================================
##@ Supabase
##=============================================================================

supabase-start: ## Start supabase containers
	@printf "\nStarting supabase:\n"
	@supabase start
.PHONY: supabase-start

supabase-stop: ## Stop supabase containers
	@printf "\nStopping supabase:\n"
	@supabase stop
.PHONY: supabase-stop

supabase-status: ## Check supabase status
	@printf "\nChecking supabase status:\n"
	@supabase status
.PHONY: supabase-status

supabase-reset: ## Reset supabase database (wipe database and re-apply all migrations and seeds)
	@printf "\nResetting supabase database:\n"
	@supabase db reset
.PHONY: supabase-reset

supabase-create-migration-%: ## Create supabase migration
	@printf "\nCreating supabase migration: supabase/migrations/some_timestamp_$*:\n"
	@supabase migration new $*
.PHONY: supabase-create-migration-%

supabase-db-diff-%: ## Create supabase migration by comparing local database with remote database
	@printf "\nCreating supabase migration by comparing schemas:\n"
	@printf "Creating custom migration: supabase/migrations/some_timestamp_$*:\n"
	@supabase db diff --use-migra -f $*
.PHONY: supabase-db-diff-%

supabase-generate-types: ## Generate supabase types
	@printf "\nGenerating supabase types:\n"
	@supabase gen types typescript --local > app/integrations/supabase/database.types.ts
.PHONY: supabase-generate-types

#==============================================================================
##@ Ngrok
##==============================================================================

ngrok-dev: ## Run ngrok for development server
	@printf "\nRunning ngrok:\n"
	@ngrok http 5173
.PHONY: ngrok-dev

ngrok-prod: ## Run ngrok for production server
	@printf "\nRunning ngrok:\n"
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
	@printf "\nCleaning project:\n"
	@rm -rf node_modules .next
	@find ${VENDOR_DIR} -type d -name 'node_modules' -exec rm -rf {} +
	@find ${VENDOR_DIR} -type d -name 'build' -exec rm -rf {} +
	@find ${VENDOR_DIR} -type d -name '.turbo' -exec rm -rf {} +
.PHONY: clean

##=============================================================================
##@ Helper
##=============================================================================

help: ## Display help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} \
	/^[a-zA-Z_-]+%?:.*?##/ { printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2 } \
	/^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.PHONY: help
