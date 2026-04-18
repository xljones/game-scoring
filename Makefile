.PHONY: run build install

run:
	docker compose up

build:
	docker compose run --rm app npm run build

# re-install if any changes made with npm install
install:
	docker compose down
	docker compose build
