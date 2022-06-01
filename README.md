# Mealbot

Mealbot is a single-page app that generates weekly meal plans and grocery list based on user preference. It saves users' time searching for recipes, creates a menu that doesn't repeat, and cuts down on grocery waste.

This project was initially created as a final project of Lighthouse Labs Full Time Web Development Bootcamp by [Grace Wang](https://github.com/GraceWXT), [Lucas Tan](https://github.com/lucasxtan), and [Warren Roque](https://github.com/wawwen1) in a week and half. Further improvement has been implemented.

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

https://user-images.githubusercontent.com/98781479/170399722-6908fd7d-5a67-4ff2-b2b0-2eef1eef0738.mov


### Meal Plan
Meal plans are generated based on user preferences, but users can also edit the meal plan using drag and drop, shuffle, and delete buttons.

https://user-images.githubusercontent.com/98781479/170399764-1df1fef5-6ab9-4cf5-a129-2cbfb263556f.mov


Users can also access their meal plan history

https://user-images.githubusercontent.com/98781479/170399834-8fe9570d-8e8f-41c6-82d6-541a37b16799.mov


### Recipe Detail
Ingredients, instructions and nutrition info are provided on the recipe detail page. Users can change the serving size to get updated ingredient quantity.

https://user-images.githubusercontent.com/98781479/170399889-2c53ed4e-dfbb-44f1-ab43-d6100625951d.mov


### Grocery List (Desktop)
Users can get a grocery list of their weekly meal plan. The quantity is based on their household size preference setting, and the ingredients are sorted by aisles.
Users can also share the grocery list by sending text message or copy on one click.

https://user-images.githubusercontent.com/98781479/170399927-fb46dcde-5bfd-43f1-9070-911535c5024d.mov


### Grocery List (Mobile)
Users can take the grocery list on the go.

https://user-images.githubusercontent.com/98781479/170399960-64aab1ff-9ca6-40c9-9faf-4c2ea6e4feb1.mov



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
