
# React Native (Expo) ToDo App

App to study the creation of mobile applications

## Create migrations

```bash
npx typeorm-ts-node-esm migration:create ./src/data/migrations/NewMigrationName

## Write script with migration API
## https://typeorm.io/migrations#using-migration-api-to-write-migrations
```

## Generate APK

```bash
expo build:android -t apk
```