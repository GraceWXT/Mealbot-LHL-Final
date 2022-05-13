# 2022-05-12 Project Planning Day One
## Routes

R `GET /` - homepage with one button

~~C/user~~
R `GET /user/:id` - Show the user profile
~~U/user~~
~~D/user~~

C `POST /mealplan/:user_id` - save meal plan
R `GET /mealplan` - show a random meal plan (for homepage button and for meal plan tab)
U `POST /mealplan/day/slot` - _update specific meal slot with new recipe (stretch)_
~~D/mealplan~~

~~C/recipe~~
R `GET /recipe`- show recipes detail for each meal
~~U/recipe~~
~~D/recipe~~

~~C/grocery_list~~
R `GET /grocery_list` - show grocery list
~~U/grocery_list~~
~~D/grocery_list~~ (don't have delete, just stylize it so it strikes out an ingredient and checks the checkbox)
