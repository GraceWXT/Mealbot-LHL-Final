# 2022-05-12 Project Planning Day One
## Routes

- [x] R `GET /` - homepage with one button

- ~~C /user~~
- [x] R `GET /users/:id` - Show the user profile
- ~~U/user~~
~~D/user~~

- [x] C `POST /mealplans/:startDate` - save meal plan
- [x] R `GET /mealplans/random` - show a random meal plan (for homepage button and for meal plan tab)
- ~~U `POST /mealplans/:id` - update specific meal plan~~ (meal plan detail is only stored at API database)
- ~~D/mealplan~~

- ~~C/recipe~~
- R `GET /recipes/:id`- show recipes detail for each meal
- ~~U/recipe~~
- ~~D/recipe~~

- ~~C/grocery_list~~
- R `GET /grocerylist/:startDate` - show grocery list for a specific week
- ~~U /grocery_list~~
- ~~D /grocery_list~~ (no actual delete, just stylize it so it strikes out an ingredient and checks the checkbox)
