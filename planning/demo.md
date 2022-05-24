# Project Demo Planning

## Flow
- Teammate Introduction & background
 - Lucas - first
 - Grace - second
 - Warren - third

- App Intro (Warren)
  - What inspired this app (Covid, bootcamp)
  - What problem this app solves (Save time, reduce food waste)
  - What this app does (automatic meal plan & grocery list generator, but don't mention twilio or specific features we want to show off yet)

- Homepage (Warren)
  - Nav bar
  - Dark mode [x] __fix button box shadow__
  - Drop-down menu button

- User Profile (Warren)
  - Profile (don't expose what we're doing with the phone number till the grocery list - it's a surprise)
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
