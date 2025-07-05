# khaykingleb.com

This is the repository for my [personal website](https://khaykingleb.com).

## Prerequisites
The only prerequisite tool for this project is [asdf](https://asdf-vm.com/) — make sure you have it installed.

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/khaykingleb/khaykingleb-com.git \
        && cd khaykingleb-com
    ```

2.  Initialize & setup:
    ```bash
    make init
    ```

    This command installs tools, dependencies, sets up `.env`, and pre-commit hooks.

3.  Configure environment:
    Edit the created `.env` file with your Supabase and Notion API keys.


## Usage

For a full list of available targets, run:

```bash
make help
```

To start the development server:

```bash
make supabase-start \
    && make deps-dev \
    && make dev
```

To run the production build locally:

```bash
make supabase-start \
    && make deps-prod \
    && make build \
    && make start
```
