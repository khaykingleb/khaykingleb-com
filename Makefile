SHELL := /bin/bash
.DEFAULT_GOAL = help

##@ Repo Initialization

prerequisite: ## Install prerequisite tools
	@echo "Checking and installing required plugins."
	@plugins=( \
		"terraform https://github.com/asdf-community/asdf-hashicorp.git" \
		"pnpm https://github.com/jonathanmorley/asdf-pnpm.git" \
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

deps: ## Install repo dependencies
	@echo "Installing dependencies."
	pnpm install
.PHONY: deps

pre-commit: ## Install pre-commit hooks
	@echo "Installing pre-commit hooks."
	pre-commit install -t pre-commit -t commit-msg

local-init: prerequisite deps pre-commit ## Initialize local environment for development
.PHONY: local-init

##@ Scripts

build:  ## Build project
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

##@ Miscullaneous

create-secrets-baseline:  ## Create secrets baseline file
	detect-secrets scan > .secrets.baseline
.PHONY: create-secrets-baseline

audit-secrets-baseline:  ## Check updated .secrets.baseline file
	detect-secrets audit .secrets.baseline
	git commit .secrets.baseline --no-verify -m "build(security): update secrets.baseline"
.PHONY: audit-secrets-baseline

clean: ## Clean project
	@echo "Cleaning project."
	rm -rf node_modules build
.PHONY: clean

##@ Helper

help:  ## Display help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage: \033[36m\033[0m\n"} /^[a-zA-Z\.\%-]+:.*?##/ { printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.PHONY: help
