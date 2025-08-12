up:
	@docker compose up --build -d

down:
	@docker compose down -v
	./rm.sh

fclean:
	@docker system prune -af
	./rm.sh

re :
	@make down && make up

logs-%:
	@docker compose logs -f $*

logs:
	@docker compose logs -f

error:
	@docker compose logs -f | grep -i error
