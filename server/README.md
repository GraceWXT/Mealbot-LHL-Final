## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information[^local-pg-database]
  - username: `labber`
  - password: `labber`
  - database: `mealbot`
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

[^local-pg-database]: Refer to [Compass midterm activity](https://web.compass.lighthouselabs.ca/activities/1272) on how to setup local pg database.
