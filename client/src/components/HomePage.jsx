import {
  Center, VStack,
  Button, Heading, Text, Image,
  useColorModeValue
} from "@chakra-ui/react";

import "./HomePage.scss";

import { Link, useOutletContext } from "react-router-dom";
// Helper functions
import { getNextMondayDate } from "helpers/date-helper";

export default function HomePage() {
  const { setStartDate } = useOutletContext();
  //Set Initial start date to next Monday
  const nextMondayDate = getNextMondayDate();

  return (
    <Center h="92vh">
      <VStack minH="56vh" maxH="85vh" marginBottom="8vh" spacing="5vh">
        <VStack spacing="5">
          <Image alt="logo" height="20vh" src="https://cdn-icons-png.flaticon.com/512/1129/1129149.png" />
          <Heading fontSize="5xl" id="catch-phrase"fontWeight="600">
            Mealtime In No Time!
          </Heading>
        </VStack>
        <VStack spacing={7} textAlign="center">
          <Heading fontSize="3xl" fontWeight="500">
            Say hello to Mealbot!
          </Heading>
          <Text fontSize="lg" maxWidth="28em">
            Mealbot allows you to get the meal plan and grocery list for an entire week in a few clicks.
            <br/> Click the button below to see what you get for next week!
          </Text>
          <Link to={`mealplan/${nextMondayDate}`}>
            <Button
              id="hungry-button"
              fontSize="3xl"
              height="2em"
              width="10em"
              borderRadius="lg"
              bg={useColorModeValue("turquoiseGreen.300", "majestyPurple.500")}
              _hover={{bg: useColorModeValue("majestyPurple.100", "turquoiseGreen.500")}}
              onClick={() => setStartDate(nextMondayDate)}
            >
              <Text id="button-text">
                I'm feeling hungry!
              </Text>
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Center>

  );
}
