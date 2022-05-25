import {
  Tab, useColorModeValue
} from "@chakra-ui/react";
export default function TabButton(props) {
  return (
    <Tab
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("hsl(0 0% 92%)", "gray.600")}
      _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
      _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
      _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
      aria-label="recipe ingredients tab"
    >{props.children}</Tab>
  );
}
