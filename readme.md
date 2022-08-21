
# React Native (Expo) ToDo App

App to study the creation of mobile applications

## Generate database migrations

```bash

# Create migration
npm run migration:generate -- ./src/data/migrations/NewMigrationName

# Add new migration to migrations list in src/data/datasource-common.ts

# Apply migration in MigrationDatabase
npm run migration:run

# https://github.com/typeorm/typeorm/issues/9294
```

## Generate APK

```bash
expo build:android -t apk
```