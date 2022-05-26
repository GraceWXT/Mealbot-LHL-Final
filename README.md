# Mealbot

Mealbot is a weekly meal plan and grocery list generator. It saves your time searching for recipes, creates a menu that doesn't repeat, and also cuts down on grocery waste.

This project was created in a week and a half by [Grace Wang](https://github.com/GraceWXT), [Lucas Tan](https://github.com/lucasxtan), and [Warren Roque](https://github.com/wawwen1) as the final project of Lighthouse Labs Full-Stack Web Development Bootcamp.

## Technologies and Libraries
- React
- Chakra UI
- React Router
- React DnD
- React Responsive
- Sass
- Twilio API
- Spoonacular API
- Express
- Axios
- PostgreSQL
- NodeJS

## Features
### Homepage & User Profile
Users can switch to light/dark mode and access their profile settings from the drop down menu on nav bar.

### Meal Plan
Meal plans are generated based on user preferences, but users can also edit the meal plan using drag and drop, shuffle, and delete buttons.

Users can also access their meal plan history

### Recipe Detail
Ingredients, instructions and nutrition info are provided on the recipe detail page. Users can change the serving size to get updated ingredient quantity.

### Grocery List (Desktop)
Users can get a grocery list of their weekly meal plan. The quantity is based on their household size preference setting, and the ingredients are sorted by aisles.
Users can also share the grocery list by sending text message or copy on one click.

### Grocery List (Mobile)
Users can take the grocery list on the go.


## Getting Started
Fork this project and clone it using the command line: `git clone [SSH link here]`

### Server Side
1. Please follow the [README](/server/README.md) in server folder to set up the database and install the dependencies.
2. For the text message function, register a trial account with [Twilio](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account) and read up to and including "Get your first Twilio phone number".
3. For the recipe database, register an account with [Spoonacular](https://spoonacular.com/food-api/console#Dashboard) and [connect a user](https://spoonacular.com/food-api/docs#Connect-User).

### Client Side
1. Run `npm i` to install the dependencies.

2. Before starting the client side server, first go to `node_modules/react-dnd/dist/core/DndProvider.js`.

3. On line 28, where it says `import { jsx as _jsx } from "react/jsx-runtime";`, add an ".js" extention to the file path: `import { jsx as _jsx } from "react/jsx-runtime.js";`.
4. Run `npm start` to start the client side server.
