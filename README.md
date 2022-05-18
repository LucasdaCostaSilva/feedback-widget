# feedback-widget

* https://impulse-feedback-widget-web.herokuapp.com/
* exps://impulse-feedback-widget-mobile.herokuapp.com/ios-index.json
* exps://impulse-feedback-widget-mobile.herokuapp.com/android-index.json
* node: 16.15.0
* npm: 8.5.5
* postgresql: 12

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

* heroku create impulse-feedback-widget-mobile
* heroku buildpacks:add -a impulse-feedback-widget-mobile https://github.com/lstoll/heroku-buildpack-monorepo
* heroku buildpacks:add -a impulse-feedback-widget-mobile heroku-community/static
* heroku config:set -a impulse-feedback-widget-mobile APP_BASE=mobile EXPO_API_FEEDBACK=https://impulse-feedback-widget-api.herokuapp.com
* export EXPO_API_FEEDBACK=https://impulse-feedback-widget-api.herokuapp.com
* npm install -g expo-cli
* npm install
* expo start --clear --no-dev --minify --https
* expo export --public-url https://impulse-feedback-widget-mobile.herokuapp.com

### Git
* git remote add heroku-mobile https://git.heroku.com/impulse-feedback-widget-mobile.git
* git push heroku-mobile main


### On Device

* With mobile app Expo Go:

* IOS
  * use the expo link [exp://impulse-feedback-widget-mobile.herokuapp.com/ios-index.json](exp://impulse-feedback-widget-mobile.herokuapp.com/ios-index.json)
  * ![exp://impulse-feedback-widget-mobile.herokuapp.com/ios-index.json](qr-ios.png)

```




```

* ANDROID
  * use the expo link [exp://impulse-feedback-widget-mobile.herokuapp.com/android-index.json](exp://impulse-feedback-widget-mobile.herokuapp.com/android-index.json)
  * ![exp://impulse-feedback-widget-mobile.herokuapp.com/android-index.json](qr-android.png)


# Footnotes
* This is a demo project.
* The code is open source.
* The code is hosted on GitHub and Heroku
