import "./App.scss";
import Navbar from "./Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Navbar />
        <Outlet />
      </ChakraProvider>
    </div>
  );
}
