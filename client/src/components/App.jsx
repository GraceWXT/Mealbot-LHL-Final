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


export default function App() {

  const [startDate, setStartDate] = useState("");

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

  const [mealPlan, setMealPlan] = useState([]);

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Navbar user={ user } setStartDate={ setStartDate } />
        <Outlet context={{ mealPlan, setMealPlan, startDate, setStartDate }} />
      </ChakraProvider>
    </div>
  );
}
