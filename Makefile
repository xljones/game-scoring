.PHONY: run build

run:
	docker compose up

build:
	docker compose run --rm app npm run build
