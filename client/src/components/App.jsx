// External components and hooks
import { useState, useEffect } from "react";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// Internal Components
import Navbar from "./Navbar";
// Styling
import theme from "styles/extended-theme";
import "./App.scss";
// Helper functions
import { getNextMondaySec } from "helpers/date-helper";

export default function App() {
  //Set Initial start date to next Monday
  const nextMondayTimestamp = getNextMondaySec();
  const nextMondayDate = new Date(nextMondayTimestamp * 1000).toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(`${nextMondayDate}`);

  // const [groceryList, setgroceryList] = useState({});
  // const [pantryItems, setPantryItems] = useState([]);

  // Get user data and set to state
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8080/api/").then(res => {
      const user = res.data;
      setUser(user);
    }).catch(err => {
      console.log("Error: ", err.message);
    });
  }, []);

  // Getrandom meal plan and set to state
  const [mealPlan, setMealPlan] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/mealplans/random").then(res => {
      const mealPlan = res.data;
      setMealPlan(mealPlan);
    }).catch(err => {
      console.log("Error: ", err.message);
    });
  }, []);


  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Navbar user={ user } />
        <Outlet context={{ mealPlan, setMealPlan, startDate, setStartDate }} />
      </ChakraProvider>
    </div>
  );
}
