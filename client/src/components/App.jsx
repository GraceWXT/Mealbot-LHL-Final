import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.scss";
import theme from "styles/extended-theme";


const user = {
  "id": 1,
  "first_name": "Gordon",
  "last_name": "Ramsay",
  "email": "idiotsandwich@email.com",
  "img_url": "https://i.imgur.com/dsTjcWuh.jpg",
  "max_calories": 800,
  "max_time": 30,
  "servings": 2
};

export default function App() {

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Navbar user={ user } />
        <Outlet />
      </ChakraProvider>
    </div>
  );
}
