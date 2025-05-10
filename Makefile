build:
	@docker build -t pong-client src/client/

run:
	@docker run --rm -p 8080:3000 pong-client

fclean:
	@docker system prune -af