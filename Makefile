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

deps: ## Install repo dependencies
	@echo "Installing dependencies."
	pnpm install
.PHONY: deps

pre-commit: ## Install pre-commit hooks
	@echo "Installing pre-commit hooks."
	pre-commit install -t pre-commit -t commit-msg

init: prerequisite notion-deps deps pre-commit ## Initialize local environment for development
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

run-dev: ## Run development server
	@echo "Running development server."
	pnpm run dev
.PHONY: run-dev

run: build ## Run production server
	@echo "Starting server."
	pnpm run start
.PHONY: run

lint: ## Lint project
	@echo "Linting project."
	pnpm run lint
.PHONY: lint

format: ## Format project
	@echo "Formatting project."
	pnpm run format
.PHONY: format

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
.PHONY: clean

##@ Helper

help:  ## Display help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage: \033[36m\033[0m\n"} /^[a-zA-Z\.\%-]+:.*?##/ { printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.PHONY: help
