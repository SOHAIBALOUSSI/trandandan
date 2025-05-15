build:
	@docker build -t pong-client src/client/

run:
	@docker run --rm --name pong-cont -p 8080:3000 pong-client

stop:
	@docker stop pong-cont

fclean:
	@docker system prune -af