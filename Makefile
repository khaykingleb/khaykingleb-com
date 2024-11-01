SHELL := /bin/bash
.DEFAULT_GOAL = help

##@ Repo Initialization

prerequisite: ## Install prerequisite tools
	@echo "Checking and installing required plugins."
	@plugins=( \
		"terraform https://github.com/asdf-community/asdf-hashicorp.git" \
		"pnpm https://github.com/jonathanmorley/asdf-pnpm.git" \
		"yarn https://github.com/twuni/asdf-yarn.git" \
		"nodejs https://github.com/asdf-vm/asdf-nodejs.git" \
		"pre-commit https://github.com/jonathanmorley/asdf-pre-commit.git" \
	); \
	for info in "$${plugins[@]}"; do \
		read plugin url <<< "$$info"; \
		if asdf plugin-list | grep -q $$plugin; then \
			echo "Plugin '$$plugin' is already installed."; \
		else \
			echo "Adding plugin '$$plugin'."; \
			asdf plugin-add $$plugin $$url; \
		fi; \
	done;
	@echo  "Installing specified versions."
	asdf install
	@echo  "Currently installed versions:"
	asdf current
.PHONY: prerequisite

deps-notion: ## Install dependencies for react-notion-x
	@echo "Installing dependencies for react-notion-x."
	git submodule update --init --recursive
	cd vendor/react-notion-x && yarn install --frozen-lockfile
.PHONY: notion-deps

deps: deps-notion ## Install repo dependencies
	@echo "Installing dependencies."
	pnpm install
.PHONY: deps

deps-prod: deps-notion ## Install production dependencies
	@echo "Installing production dependencies."
	pnpm install --frozen-lockfile
.PHONY: deps-prod

pre-commit: ## Install pre-commit hooks
	@echo "Installing pre-commit hooks."
	pre-commit install -t pre-commit -t commit-msg

init: prerequisite deps-notion deps pre-commit ## Initialize local environment for development
.PHONY: init

##@ Scripts

build-notion: ## Build react-notion-x
	@echo "Building react-notion-x."
	cd vendor/react-notion-x && yarn build
.PHONY: build-notion

build: build-notion ## Build project
	@echo "Building project."
	pnpm run build
.PHONY: build

build-cloudflare: ## Build project for Cloudflare Pages
	@echo "Building project for Cloudflare Pages."
	@echo "Remove .tool-versions file because of https://community.cloudflare.com/t/how-to-disable-automatic-installs-of-tool-versions-and-package-json/570450."
	rm .tool-versions
	@echo "Building project."
	cd vendor/react-notion-x && yarn build
	pnpm run build
.PHONY: build-cloudflare

run-dev: ## Run development server
	@echo "Running development server."
	pnpm run dev
.PHONY: run-dev

run-prod: build ## Run production server
	@echo "Starting server."
	pnpm run start
.PHONY: run-prod

lint: ## Lint project
	@echo "Linting project."
	pnpm run lint && pnpm run stylelint && pnpm run typecheck
.PHONY: lint

format: ## Format project
	@echo "Formatting project."
	pnpm run format
.PHONY: format

ngrok-dev: ## Run ngrok for development server
	@echo "Running ngrok."
	ngrok http 5173
.PHONY: ngrok-dev

ngrok-prod: ## Run ngrok for production server
	@echo "Running ngrok."
	ngrok http 3000
.PHONY: ngrok-prod

##@ Miscullaneous

create-secrets-baseline:  ## Create secrets baseline file
	detect-secrets scan > .secrets.baseline
.PHONY: create-secrets-baseline

audit-secrets-baseline:  ## Check updated .secrets.baseline file
	detect-secrets audit .secrets.baseline
	git commit .secrets.baseline --no-verify -m "build(security): update secrets.baseline"
.PHONY: audit-secrets-baseline

update-pre-commit-hooks:  ## Update pre-commit hooks
	pre-commit autoupdate
.PHONY: update-pre-commit-hooks

clean: ## Clean project
	@echo "Cleaning project."
	rm -rf node_modules build
	find vendor/react-notion-x -type d -name 'build' -exec rm -rf {} +
	find vendor/react-notion-x -type d -name 'node_modules' -exec rm -rf {} +
.PHONY: clean

##@ Helper

help:  ## Display help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage: \033[36m\033[0m\n"} /^[a-zA-Z\.\%-]+:.*?##/ { printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.PHONY: help
