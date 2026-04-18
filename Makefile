.PHONY: run build install deploy

run:
	docker compose up

build:
	docker compose run --rm -e NODE_ENV=production app npm run build

# re-install if any changes made with npm install
install:
	docker compose down
	docker compose build

deploy: build
	cd out && \
	git init && \
	git add -A && \
	git commit -m "Deploy $$(date)" && \
	git push -f $(REMOTE) HEAD:gh-pages
