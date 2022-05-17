import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "Inter, sans-serif"
      }
    }
  },
  colors: {
    turquoiseGreen: {
      50: "#e5f9f1",
      100: "#c6e9d9",
      200: "#a5d9c0",
      300: "#83caab",
      400: "#62ba9a",
      500: "#48a187",
      600: "#377e6d",
      700: "#265a51",
      800: "#143634",
      900: "#001413",
    },
    majestyPurple: {
      50: "#f8edfd",
      100: "#ddcde7",
      200: "#c4add3",
      300: "#aa8cbf",
      400: "#956bac",
      500: "#805293",
      600: "#674073",
      700: "#4d2d53",
      800: "#311a33",
      900: "#160716",
    }
  }
});

export default theme;
