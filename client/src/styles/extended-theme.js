import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "Inter, sans-serif"
      }
    }
  }
});

export default theme;
