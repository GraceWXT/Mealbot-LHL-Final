# App Breakdown
- [ ] Button

- [x] Navbar

- [ ] Profile
  - [ ] UserProfile
  - [ ] InfoColumn

- [ ] HomePage

- [ ] Loading

- [ ] MealPlan
  - [ ] MealPlantable
    - [ ] MealItem

- [ ] Recipe
  - [ ] TabButton
  - [ ] IngredientsDetail
  - [ ] InstructionsDetail

- [ ] GroceryList
  - [ ] AisleNavigator
  - [ ] GroceryChecklist
    - [ ] Aisle (ingredients list by aisle)
      - [ ] IngredientInAisle

## App
- State: __user__, , __groceryList__, __pantryItems__
- Props: none

## Button
- State: none
- Props: __children__ (string), __handleClick__(function),
- Used by: HomePage, MealPlan

## Navbar
- State: none
- Props: __user__ (object: id, imgUrl)

## Profile
- State: none
- Props: __user__ (object: imgUrl, firstName, lastName, email, maxCalories, maxReadyTime, householdSize), __pantryItems__(array of objects)
- Used by: App

- ## UserProfile
  - State: none
  - Props: __user__ (object: imgUrl, firstName, lastName, email, )
  - Used by: ProfilePage

- ## InfoColumn (preferences)
  - State: none
  - Props: __user__ (object: maxCalories, maxReadyTime, householdSize)
  - Used by: ProfilePage

- ## InfoColumn (pantry items)
  - State: none
  - Props: __pantryItems__ (array of objects: name)
  - Used by: ProfilePage

## MealPlan
- State: __mealPlan__
- Props: mealPlan, setMealPlan
- Used by: App
  - ## Meal Plan Table
  - State: none
  - Props: mealPlan, setMealPlan
    - ### Meal
      - State: none
      - Props: __recipe__ (object: imgUrl, title || null when deleted), __handleDelete__
      - Used by: ProfilePage
      - ### DeleteIcon
      - Props: __handleDelete__

## Recipe
- State: __selectedTab__
- Props: __recipe__ (object)
- ## TabButton
  - State: none
  - Props: __children__(string), __selectedTab__(string), __setSelectedTab__(function)
- ## IngredientsDetail
  - State: none
  - Props: __data__(object of ingredients/nutritions)
  - ingredients
  - nutritions
- ## InstructionsDetail
  - State: none
  - Props: __data__(object of instructions)

## GroceryList
- State: __filteredGroceryList__
- Props: __groceryList__ (array of objects), __pantryItems__(array of objects)
  - create __filteredGroceryList__ here and pass down to _AislesNavigator_ and _GroceryChecklist_
  - ### AislesNavigator (table of contents for aisle names)
    - Props: __filteredGroceryList__ (array of objects) (same prop to all components below)
      - just loops over the aisle keys, don't need the values
  - ### GroceryChecklist (all aisles) - render an array of Aisles components

    - #### Aisle (ingredient list) (contains ingredient components)
      - #### Ingredient
        - Props: __setFilteredGroceryList__
