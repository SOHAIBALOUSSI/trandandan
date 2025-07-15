run:
	@docker-compose up --build

up:
	@docker compose up --build

down:
	@docker compose down

fclean:
	@docker system prune -af

re :
	docker compose down -v && docker compose up --build