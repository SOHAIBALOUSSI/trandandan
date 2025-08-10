up:
	@docker compose up --build -d

down:
	@docker compose down

fclean:
	@docker system prune -af

re :
	docker compose down -v && docker compose up --build

logs-%:
	@docker compose logs -f $*

logs:
	@docker compose logs -f