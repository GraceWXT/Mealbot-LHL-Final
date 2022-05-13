# Project Planning
## To Do List:
- [x] Ideation
  - [x] Project Title
  - [x] Project Demo Story
  - [x] Project Features (core and stretch)

- [x] User Stories

- [ ] ERD

- [ ] Routes

- [ ] Wireframes

- [ ] Components

- [ ] Styling references/Component libraries

- [ ] Tech stack
  - Dependencies
    - server
      - [ ] Express
      - [ ] dotenv
      - [ ] axios
      - [ ] pg
      - [ ] bcryptjs?
    - client
      - [ ] Create React App
      - [ ] classnames
      - [ ] axios

  - Dev Dependencies
    - server
      - [ ] Morgan
      - [ ] Nodemon
    - client
      - [ ] node-sass
      - [ ] storybook related
      - [ ] cypress

  - Database
    - copy recipes from spoonacular into our database (only call our database, don't call spoonacular) - put in recipe id, name, image into database (and what else?)
    - when calling recipe page we do call spoonacular with the recipe id (that's only one get request)
    - database - we send the recipe id and serving size to spoonacular; spoonacular then grabs ingredients from their own database

- [ ] Team Workflow (Git, Task Distribution, Meeting Schedule, Coding Styles, etc.)

- [ ] DB Setup

## 2022-05-12 Project Planning Day One
### Ideation
- Project Title
  - lunchow
  - lazy susan
  - suppetized
  - dinet
  - meal with it
  - dingdish (L)
  - __mealbot__(wr, G)
  - dingner
  - mealater
  - dine-a-myte
  - hungram
  - lunch lab (wr, L1)
  - preppetizr (wr, G)
  - JustCook
  - QuickEats(wr, L2)
  - Dineversity
  - PlateTime (L)

### Project Demo Story
- Show the __user profile
- Show __Homepage__ with __one button__, __filled meal plan shows up__ (delete or change?)
- Click on one __recipe to show detail__
  - Click to exit recipe page
- Click button to __get shopping list and show mobile responsive__


### Project Features
#### Core
- User Profile
  - Username, First and last name, email, avatar
  - Preferences (display only): calorie per recipe (ex.800), MaxTime 30 min, household size 2, etc)
  - Default pantry items/ingredients we already have

- Home Page
  - one button that generates a random meal plan

- Meal plan
  - 7 * 3 table Mon to Sun, no date
  - delete meal button
  - recipe preview: title, image, link to recipe page
  - save button
  - button to call shopping list

- Recipe page
  - static info
  - exit button

- Shopping List
  - checkboxes and strikethrough
  - desktop-mode: different columns for different aisles?
  - mobile-mode: one columns - vertical for all aisles


#### Stretch
- User Profile
  - be able to change the User Diet Profile
  - meal prep history (new meal plan added after click save button on meal plan page)
- Home Page
- Meal plan
  - randomize button to change recipe
  - flip card to delete?
  - drag and drop?
  - search bar for editing recipes (Autocomplete Ingredient Search)
- Shopping List
  - one button copy entire shopping list
  - Twilio
  - Converting units
- Render a random food joke/trivia in the transition/loading mode
