##################
# Docker compose
##################

dc_build:
	docker compose build

dev:
	docker compose up -d --remove-orphans

mac_build:
	docker-compose build

mac_dev:
	docker-compose up -d --remove-orphans	

dc_start:
	docker compose start

dc_stop:
	docker compose stop

dc_down:
	docker compose down --remove-orphans

dc_ps:
	docker compose ps -a

dc_logs:
	docker compose logs -f app --tail=10

##################
# App
##################

app_bash:
	docker compose exec -u node -w /home/node/app app bash
