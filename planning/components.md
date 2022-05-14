# App Breakdown
- [ ] Button

- [ ] Navbar

- [ ] AppBody

- [ ] ProfileMode
  - [ ] UserProfile
  - [ ] InfoColumn

- [ ] HomePageMode

- [ ] LoadingMode

- [ ] MealPlanMode
  - [ ] MealPlantable
    - [ ] MealItem

- [ ] RecipeDetailMode
  - [ ] TabButton
  - [ ] IngredientsDetail
  - [ ] InstructionsDetail

- [ ] GroceryListMode
  - [ ] AisleNavigator
  - [ ] GroceryChecklist
    - [ ] Aisle (ingredients list by aisle)
      - [ ] IngredientInAisle

## App
- State: __user__

## Button
- State: no state
- Props: __children__ (string), __handleClick__(function),
- Used by: HomePageMode, MealPlanMode

## Navbar
- State: no state
- Props: __user__ (object: id, imgUrl)

## AppBody
- State: __mode, mealPlan, ingredientList, pantryItems__
- Props: __user__ (object: id, imgUrl), __pantryItems__(array of objects)
- Used by: App

## ProfileMode
- State: no state
- Props: __user__ (object: imgUrl, firstName, lastName, email, maxCalories, maxReadyTime, householdSize), __pantryItems__(array of objects)
- Used by: App

- ## UserProfile
  - State: no state
  - Props: __user__ (object: imgUrl, firstName, lastName, email, )
  - Used by: ProfilePage

- ## InfoColumn (preferences)
  - State: no state
  - Props: __user__ (object: maxCalories, maxReadyTime, householdSize)
  - Used by: ProfilePage

- ## InfoColumn (pantry items)
  - State: no state
  - Props: __pantryItems__ (array of objects: name)
  - Used by: ProfilePage

## MealPlanMode
- State: no state
- Props: mealPlan, setMealPlan
- Used by: App
  - ## Meal Plan Table
  - State: no state
  - Props: mealPlan, setMealPlan
    - ### Meal
      - State: no state
      - Props: __recipe__ (object: imgUrl, title || null when deleted), __handleDelete__
      - Used by: ProfilePage
      - ### DeleteIcon
      - Props: __handleDelete__

## RecipeDetailMode
- State: __selectedTab__
- Props: __recipe__ (object)
- ## TabButton
  - State: no state
  - Props: __children__(string), __selectedTab__(string), __setSelectedTab__(function)
- ## IngredientsDetail
  - State: no state
  - Props: __data__(object of ingredients/nutritions)
  - ingredients
  - nutritions
- ## InstructionsDetail
  - State: no state
  - Props: __data__(object of instructions)

## GroceryListMode
- State: __filteredIngredientList__
- Props: __ingredientList__ (array of objects), __pantryItems__(array of objects)
  - create __filteredIngredientList__ here and pass down to _AislesNavigator_ and _GroceryChecklist_
  - ### AislesNavigator (table of contents for aisle names)
    - Props: __filteredIngredientList__ (array of objects) (same prop to all components below)
      - just loops over the aisle keys, don't need the values
  - ### GroceryChecklist (all aisles) - render an array of Aisles components

    - #### Aisle (ingredient list) (contains ingredient components)
      - #### IngredientInAisle
        - Props: __setFilteredIngredientList__
