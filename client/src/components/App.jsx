// External components and hooks
import { useState, useEffect } from "react";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Internal Components
import Navbar from "./Navbar";
// Styling
import theme from "styles/extended-theme";
import "./App.scss";

// testing data
// import testingMealPlan from "./MealPlan/testing-mealplan";

export default function App() {

  const [startDate, setStartDate] = useState("");

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

  // Get pantryItems data and set to state
  const [pantryItems, setPantryItems] = useState([]);

  // Meal Plan related status
  const [mealPlan, setMealPlan] = useState([]);
  const [mealPlanStatus, setMealPlanStatus] = useState("");
  console.log("mealPlanStatus:", mealPlanStatus);

  // based on the startDate
  // send an axios request to get back end to get either an existing plan or a random new plan
  // set meal plan data and status based on the response
  useEffect(() => {
    if (startDate) {
      setMealPlanStatus("Loading");
      axios.get(`http://localhost:8080/api/mealplans/${startDate}`).then(res => {
        setMealPlan(res.data.mealplan);
        if (Date.parse(startDate) > new Date().setHours(0, 0, 0, 0)) {
          setMealPlanStatus(`Future${res.data.status}`);
        } else {
          setMealPlanStatus(`Past${res.data.status}`);
        }
      }).catch(err => {
        console.log("axios.get mealplans/startDate error: ", err.message);
      });
    }
  }, [startDate]);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <ChakraProvider theme={theme}>
          <Navbar user={user} setStartDate={setStartDate} />
          <Outlet context={{
            user,
            pantryItems, setPantryItems,
            mealPlan, setMealPlan,
            startDate, setStartDate,
            mealPlanStatus, setMealPlanStatus,
          }} />
        </ChakraProvider>
      </DndProvider>
    </div>
  );
}
