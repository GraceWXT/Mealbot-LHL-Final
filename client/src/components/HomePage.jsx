import {
  Flex,
  Container,
  Spacer,
  Center,
  VStack,
  Button,
  Box,
  Text,
  Image,
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
    <Container>
      <VStack mt="20px" height="80vh">
        <Box m="30px" align="center">
          <Image boxSize="100px" mb="10px" src="https://cdn-icons-png.flaticon.com/512/1129/1129149.png" />
          <Text fontSize="28px" fontWeight="600">
            MEALTIME IN NO TIME!
          </Text>
        </Box>
        <Box w="75%" mt={50} h="200px" textAlign="center">
          <Text fontSize="20px" fontWeight="500" mb="10px">
            Say hello to Mealbot!
          </Text>
          <Text noOfLines={2}>
            Mealbot allows you to generate a random meal plan for the entire week!
          </Text>
          <br />
          <Text>
            Click the button below to see what you get
          </Text>
          <br />
          <Link to={`mealplan/${nextMondayDate}`}>
            <Button
              id="homepage-button"
              fontSize="22px"
              fontWeight="600"
              w="100%"
              h="50px"
              bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
              onClick={() => setStartDate(nextMondayDate)}

            >
              I'm feeling hungry!
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>

  );
}
