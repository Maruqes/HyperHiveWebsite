.PHONY: install build start

install:
	npm ci

build: install
	npm run build

start:
	npm run start
