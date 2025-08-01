up:
	@docker compose up --build

down:
	@docker compose down

ssl:
	@cd client && chmod +x generate-dev-ssl.sh && ./generate-dev-ssl.sh

https: ssl
	@echo "🔐 Starting HTTPS development server..."
	@docker compose up --build frontend

fclean:
	@docker system prune -af

re :
	docker compose down -v && docker compose up --build