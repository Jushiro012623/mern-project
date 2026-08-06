
up:
	docker compose up --watch

build:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

clean:
	docker system prune -f

dev:
	docker compose up --build --watch
