up:
	@docker compose up --build

down:
	@docker compose down
	./rm.sh

fclean:
	@docker system prune -af
	./rm.sh

re :
	./rm.sh
	docker compose down -v && docker compose up --build

logs-%:
	@docker compose logs -f $*
