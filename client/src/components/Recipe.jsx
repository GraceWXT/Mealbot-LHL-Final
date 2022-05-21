import React, { useState, useEffect } from "react";
import axios from "axios";

//grab info from params
import { useParams } from "react-router-dom";

//chakra-ui components
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { mode } from "@chakra-ui/theme-tools";
import {
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Recipe() {
  const [originalServings, setOriginalServings] = useState(0);
  const [state, setState] = useState({
    ingredients: [],
    instructions: [],
    nutrition: [],
    title: "",
    readyInMinutes: "",
    image: "",
    servings: 0
  });

  const recipeMock = {
    "ingredients": [
      {
        "name": "bell peppers",
        "amount": 4,
        "unit": "servings"
      },
      {
        "name": "cayenne",
        "amount": 0.5,
        "unit": "tsps"
      },
      {
        "name": "chili powder",
        "amount": 0.25,
        "unit": "tsps"
      },
      {
        "name": "chorizo",
        "amount": 1,
        "unit": "lb"
      },
      {
        "name": "cumin",
        "amount": 0.25,
        "unit": "tsps"
      },
      {
        "name": "green onion tops",
        "amount": 4,
        "unit": "servings"
      },
      {
        "name": "jack cheese",
        "amount": 0.25,
        "unit": "cups"
      },
      {
        "name": "lean ground beef",
        "amount": 1,
        "unit": "lb"
      },
      {
        "name": "quinoa",
        "amount": 1,
        "unit": "cup"
      }
    ],
    "instructions": [
      {
        "number": 1,
        "step": "The first thing you will want to do is heat the oven to 350, boil the water for the quinoa, and in a separate skillet brown the beef and chorizo together."
      },
      {
        "number": 2,
        "step": "Drain the meat mixture well, and then place into a medium mixing bowl.Once your quinoa is fully cooked, add it to the mixing bowl."
      },
      {
        "number": 3,
        "step": "Add the green onion tops, cumin, cayenne, chili powder, and monterrey jack and cheddar cheese."
      },
      {
        "number": 4,
        "step": "Mix well."
      },
      {
        "number": 5,
        "step": "Cut the tops from your bell peppers and scoop out any remaining seeds.Then take your meat mixture and start stuffing the bell peppers until they are full."
      },
      {
        "number": 6,
        "step": "Sprinkle with a little cheese and then bake in the oven for about 10 minutes until the bell pepper has softened."
      },
      {
        "number": 7,
        "step": "Serve immediately."
      }
    ],
    "nutrition": [
      {
        "name": "Calories",
        "amount": 685.04,
        "unit": "kcal"
      },
      {
        "name": "Fat",
        "amount": 37.03,
        "unit": "g"
      },
      {
        "name": "Carbohydrates",
        "amount": 32.52,
        "unit": "g"
      },
      {
        "name": "Protein",
        "amount": 51.15,
        "unit": "g"
      }
    ],
    "title": "Chorizo and Beef Quinoa Stuffed Pepper",
    "readyInMinutes": 30,
    "image": "https://spoonacular.com/recipeImages/715523-556x370.jpg",
    "servings": 4
  };

  // get data to update state;

  // const { id } = useParams();
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/recipes/${id}`
  //   ).then((res) => {
  //     // console.log("res", res.data);
  //     setState(prev => ({ ...prev, ...res.data }));
  //   });
  // }, []);

  // const { colorMode, toggleColorMode } = useColorMode();
  // const customTheme = extendTheme(
  //   onClick=({
  //     colorScheme: 'turquoiseGreen.100' }))


  useEffect(() => {
    setState(prev => ({ ...prev, ...recipeMock }));
    setOriginalServings(recipeMock.servings);
  }, []);


  // console.log("state", state);

  //creates array of ingredients copied from state.ingredients
  const ingredientsArray = [...state.ingredients];

  //serving calculator

  const addServing = () => {
    setState({
      ...state,
      servings: state.servings + 1
    });
  };

  const minusServing = () => {
    if (state.servings > 0) {
      setState({
        ...state,
        servings: state.servings - 1
      });
    }
  };



  //maps over ingredientsArray to return list of ingredients
  const ingredientList = ingredientsArray.map((ingredient, index) => {

    let newServings = state.servings / originalServings;

    return (
      <ListItem key={index} py={2} borderBottom='1px' borderColor='gray.200'>
        {ingredient.amount * newServings} {ingredient.unit} {ingredient.name}
        {/* <Divider /> */}
      </ListItem>
    );
  });

  //creates an array of instructions
  const instructionsArray = [...state.instructions];
  // console.log("instructionsArray", instructionsArray);

  //maps over instructionsArray to return a list of instructions
  const instructionsList = instructionsArray.map((instruction, index) => {
    return (
      <ListItem key={index} py={2} borderBottom='1px' borderColor='gray.200'>
        {instruction.step}
        {/* <Divider /> */}
      </ListItem>
    );
  });

  //creates an array of nutrition
  const nutritionArray = [...state.nutrition];
  // console.log("nutritionArray", nutritionArray);

  //maps over instructionsArray to return a list of instructions
  const nutritionList = nutritionArray.map((nutrient, index) => {
    return (
      // <ListItem py={2}>
      <Box key={index} py={2} borderBottom='1px' borderColor='gray.200'>
        <Flex>
          <Text fontWeight='semibold'>
            {nutrient.name}
          </Text>
          <Spacer />
          <Text>
            {nutrient.amount} {nutrient.unit}
          </Text>
        </Flex>
        {/* <Divider /> */}
      </Box>
      // </ListItem>
    );
  });




  return (
    <Box>
      <Link to={"/mealplan/2022-05-23"} >
        <Button
          m={5}
          bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
          leftIcon={<ArrowBackIcon />}
          _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
          _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
          aria-label='go back to meal plan'
        >
          Back
        </Button>
      </Link>
      <HStack alignItems="start" m={2}>
        <Container w="40%">
          <Heading as='h2' size='lg'>{state.title}</Heading>
          <Divider />
          <Text py={2}>Cooking time: {state.readyInMinutes} minutes</Text>
          {/* <Divider /> */}
          <HStack marginBottom={3}>
            <IconButton
              onClick={addServing}
              borderRadius="50%"
              size="xs"
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              icon={<FaPlus />}
              aria-label='add serving by one'
            />

            <Text py={2}>{state.servings} servings</Text>
            <IconButton
              onClick={minusServing}
              borderRadius="50%"
              size="xs"
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              icon={<FaMinus />}
              aria-label='minus serving by one'
            />
          </HStack>
          <Image src={state.image} rounded="md" />
        </Container>

        <Divider orientation='vertical' />


        <Tabs isFitted variant='enclosed' w="60%" bg={useColorModeValue("white", "gray.700")} rounded="lg" boxShadow="lg">
          <TabList mb='1em' >
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label='recipe ingredients tab'
            >Ingredients</Tab>
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label='recipe instructions tab'
            >Instructions</Tab>
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label='recipe nutrition tab'
            >Nutrition</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UnorderedList>
                {ingredientList}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <OrderedList>
                {instructionsList}
              </OrderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList>
                {nutritionList}
              </UnorderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </Box>


  );
}
