import { useState, useEffect } from "react";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.scss";
import theme from "styles/extended-theme";

export default function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get("/").then(user => {
      setUser(user);
    }).catch(err => {
      console.log("Error: ", err.message);
    });
  }, []);

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Navbar user={ user } />
        <Outlet />
      </ChakraProvider>
    </div>
  );
}
