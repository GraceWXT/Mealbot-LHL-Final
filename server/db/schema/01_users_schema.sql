DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  img_url text,
  api_user_hash VARCHAR(255) NOT NULL,
  api_username VARCHAR(255) NOT NULL,
  max_calories INTEGER,
  max_time INTEGER,
  servings INTEGER
);
