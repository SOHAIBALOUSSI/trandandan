up:
	@docker compose up --build -d

down:
	@docker compose down
	./rm.sh

fclean:
	@docker system prune -af
	./rm.sh

re :
	docker compose down -v && docker compose up --build -d

logs-%:
	@docker compose logs -f $*

logs:
	@docker compose logs -f

error:
	@docker compose logs -f | grep -i error
