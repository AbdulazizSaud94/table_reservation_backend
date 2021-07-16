# Table Reservation Backend

## API documentation can be found using Swagger on

http://localhost:3000/swagger/

## Packages that need to be installed

Install all dependencies

```bash
npm install
```

## Usage

Run in development mode using nodemon

```bash
npm run dev
```

Compile typescript code to javascript (js files are found in cjs directory)

```bash
npm run build
```

Start compiled js files

```bash
npm run start
```

## Run TS lint

```
npm run lint
```

## To start postgres database in docker container (tables will be created automatically on app start)

```
npm run create-dev-database
```

## SQL query that create the first user can be found in:

./sql/createFirstUser.sql
