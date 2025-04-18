all:
	@docker compose up --build -d

down:
	@docker compose down

fclean:
	@docker system prune -af