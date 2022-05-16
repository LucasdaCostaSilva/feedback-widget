# feedback-widget

https://impulse-feedback-widget-web.herokuapp.com/

## Heroku deploy

* heroku login

### Checks
* heroku buildpacks -a impulse-feedback-widget-web
  ```
  1. https://github.com/lstoll/heroku-buildpack-monorepo
  2. heroku/nodejs
  3. heroku-community/static
  ```
* heroku buildpacks -a impulse-feedback-widget-api
  ```
  1. https://github.com/lstoll/heroku-buildpack-monorepo
  2. heroku/nodejs
  ```
* heroku config -a impulse-feedback-widget-api
  ```
  APP_BASE:     server
  DATABASE_URL: postgres://u:p@c.amazonaws.com:5432/d
  ```
* heroku config -a impulse-feedback-widget-web
  ```
  APP_BASE:     web
  VITE_API_URL: https://impulse-feedback-widget-api.herokuapp.com
  ```


## API

* heroku create impulse-feedback-widget-api
* heroku buildpacks:add -a impulse-feedback-widget-api   https://github.com/lstoll/heroku-buildpack-monorepo
* heroku buildpacks:add -a impulse-feedback-widget-api  heroku/nodejs
* heroku config:set -a impulse-feedback-widget-api  APP_BASE=server

### Database

* heroku addons:create heroku-postgresql:hobby-dev -a impulse-feedback-widget-api

* echo "#DB Config" >> server/.env
* echo -n "DATABASE_URL" >> server/.env
 * heroku config:get DATABASE_URL -a impulse-feedback-widget-api >> server/.env

* Create Table:
  ```
  npm run dev
  echo "at https://data.heroku.com/dataclips and add the following:"
  echo "set transaction read write; "
  cat server/prisma/migrations/*/migration.sql
  ```

### Git
* git remote add heroku-api https://git.heroku.com/impulse-feedback-widget-api.git
* git push heroku-api main



## WEB

* heroku create impulse-feedback-widget-web
* heroku buildpacks:add -a impulse-feedback-widget-web https://github.com/lstoll/heroku-buildpack-monorepo
* heroku buildpacks:add -a impulse-feedback-widget-web  heroku/nodejs
* heroku buildpacks:add -a impulse-feedback-widget-web heroku-community/static
* heroku config:set -a impulse-feedback-widget-web  APP_BASE=web VITE_API_URL=https://impulse-feedback-widget-api.herokuapp.com

### Git
* git remote add heroku-web https://git.heroku.com/impulse-feedback-widget-web.git
* git push heroku-web main


## MOBILE

* export PORT=3030
* export EXPO_API_FEEDBACK=https://impulse-feedback-widget-api.herokuapp.com
* sudo npm i -g expo-cli@^4.3.0 @expo/ngrok@^4.1.0
* npm run cloud
* With Expo Go:
  * use the expo link [exp://193.123.113.75](exp://193.123.113.75)
  * OR:
     ![exp://193.123.113.75](./qr-code.png)

# Footnotes
* This is a demo project.
* The code is open source.
* The code is hosted on GitHub, Heroku and Oracle Cloud.
