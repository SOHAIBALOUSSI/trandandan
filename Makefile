run:
	@docker-compose up --build 

down:
	@docker compose down

fclean:
	@docker system prune -af