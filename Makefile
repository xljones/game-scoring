.PHONY: run build install deploy

REMOTE := $(shell git remote get-url origin)

run:
	docker compose up

build:
	docker compose run --rm \
		-e NODE_ENV=production \
		-e NEXT_PUBLIC_BASE_PATH=$(NEXT_PUBLIC_BASE_PATH) \
		app npm run build
	touch out/.nojekyll

# re-install if any changes made with npm install
install:
	docker compose down
	docker compose build

deploy:
	$(MAKE) build NEXT_PUBLIC_BASE_PATH=/game-scoring
	cd out && \
	git init && \
	git add -A && \
	git commit -m "Deploy $$(date)" && \
	git push -f $(REMOTE) HEAD:gh-pages
