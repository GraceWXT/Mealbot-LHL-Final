# Project Demo Planning

## Flow
- Teammate Introduction & background
 - Lucas - first
 - Grace - second
 - Warren - third

- App Intro (Warren)
  - What inspired this app (Covid, bootcamp)
  - What problem this app solves (Save time, reduce food waste)
  - What this app does (meal plan & grocery list generator based on user preferences)

- Homepage (Warren)
  - Nav bar
  - Dark mode [x] __fix button box shadow__
  - Drop-down menu button

- User Profile (Warren)
  - Profile (don't expose what we're doing with the phone number till the grocery list)
  - Preferences (What they are for, Editable Input)
  - Pantry items (Purpose)

- Homepage (Warren)
  - Hungry Button
  - hand off to Grace

- Meal plan (Grace) [ ] __decide recipe to show/shuffle/delete__
  - date header (meal plan history)
  - table (grocery button not available yet)
    - Recipe (serving calculator, ingredients, instructions, nutrition)
    - back to table
    - shuffle (not like the recipe)
    - delete (dine out)
    - DnD (keep the recipe but dine out)
  - Save
    - (Toast)
    - not editable anymore
    - Grocery list available
    - hand off to Lucas

- Grocery List (Lucas)
  - Scroll on the grocery list (show it's organized by aisles alphabetically)
    - but it's too long (show link to aisles)
  - Click on an aisles link (click on an aisle on the bottom)
  - Responsive design (You can take the app with you to the store - show what it'll look like on mobile)
  - Show checkboxes
  - Send Twilio grocery list to someone else (that's from the saved phone number - Grace will send me her grocery list)
  - Copy button (what if I want to send to Whatsapp instead?)
  - Units in metrics - specific for grocery shopping (compared to units for recipe page)

- Closing
  - Planned very thoroughly
    - Clear plan - everyone on the same page
    - Had all the __components__, logic, and wireframes structured - made building the app much easier
  - Learned new libraries
    - Chakra
    - React Router
    - Drag and Drop
    - React Responsive
  - Further development
    - Fav a recipe and repeat (certain frequency)
    - Search bar
    - Connect to local grocery store (online order, compare costs)
    - Coupons for ingredients in our grocery list

## Script

- Teammate Introduction & background
  - Lucas
  > Hi everyone,
  > My name's Lucas, and I come from a background in food inspection
  - Grace
  > Hi I'm Grace and I have a background in tourism and flooring wholesale industry.
  - Warren
  > And I'm Warren with a background in health care.

- App Intro (Warren)
  > We're team MealBot and we've created an app for efficient meal planning. For tech stack, we used React, Express, PostgreSQL, and Node.
  > Has anyone ever struggled to choose what to eat or cook at home? I'm sure you all have and so the creation of Mealbot was born. Mealbot is an app that allows you to generate a weekly meal plan, consisting of 3 meals per day by default. This is based off your inputted preferences and dietary restrictions.
  > It saves the time for you to search for recipes and decide the menu for a whole week without repeating.
  > It also reduces chance of wasting food or grocery shopping during weekdays.


- Navbar (Warren)

  - switch to dark mode
  - drop down menu


- User Profile (Warren)
  > So lets begin with the user profiles, where you are able to filter your results and add items you already have at home. You can also add your number which we will talk about later.
  - Point to Preference

- Homepage (Warren)
  > Next, the homepage which only consists of a button and our logo/slogan. Users only have one option here, which is to generate the meal plan. After clicking this button, the user is taken to the meal plan page which my group member Grace will talk about.

- Meal plan (Grace)
  > Thank you!
  > The home page button takes you to the meal planner of next week.
  - Point to date header
  > You can navigate to previous weeks to see your meal plan history from here.
  - click previous week button and back to next

  > There is also a save button, and a get grocery list button which is disabled until the meal plan is saved.
  - Point to buttons
  > By clicking the recipe card,
  - Click one recipe
  > you'll see the ingredients, instructions and nutrition info for each recipe.
  - Click through the Tabs
  > The plus and minus button allows you change the serving size.
  - Click plus minus button, click back to meal plan
  > Now back to the meal plan table. We've designed a few ways for you to adjust the meal plan.
  > If you don't like a particular recipe, hover over it and you'll see the button for shuffling recipes.
  - hover recipe and click shuffle a few times
  > If you have a plan to dine out for a certain meal, you can delete it.
  - delete Sunday night
  > But if you really like the recipe, you can also delete another recipe that you don't like, and switch the position by drag and drop
  - Delete Wed Lunch and switch with Saturday Dinner
  > The drag and drop also works if you simply want to switch the order of recipes.
  - DnD again
  > Once you're satisfied with the plan, you can save it.
  - Click save
  > And you won't be able to edit it anymore
  - Show delete, shuffle and DnD disabled
  > Now you can get the grocery list. And I'll hand it off to Lucas to talk about it.
  - Click the grocery list button

- Grocery List (Lucas)
  > Thanks Grace!
  > The grocery list is generated based on the household size in your user profile preferences
  - Start scrolling down the grocery list
  > As we scroll down the grocery list you can see it's organized by aisles, and under each aisle are a list of ingredients
  > But this is a long list and it's inconvenient to scroll through, so we have designed a navigation side bar with links to jump to each aisle
  - Click "Meat", Click the last aisle
  > We've made the grocery list mobile responsive so you can take it on the go, and check the boxes as you grab the things in the store
  - change app size to mobile
  - check box
  > You can then open the aisle sidebar by clicking a button instead
  - open sidebar, click on an aisle
  > There are also features for you to easily share the grocery list with someone else.
  > You can send a text message to the phone number you saved on your profile page.
  - click the twilio button
  - show text message on my phone
  > Or copy the grocery list and send it on some other messaging app.
  - click copy button and paste it into a note
  > These are all the main features of our app.

- Closing (Lucas)
  > Before we started coding we made a very detailed plan with all the features, functionality, data flow, and wireframes for our app - and I think that helped us have a clear direction while building it
  > We also learned some new tools like Chakra-UI, React Router, React Drag and Drop, Twilio and React Responsive
  > If we had more time to work on it,
    > we'd like to add recipe rating, search bar, and even connect with local stores for online ordering, cost comparison, and coupons.
  > That's our app and we hope you enjoyed it
