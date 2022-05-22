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

import recipeInfo from "./recipe-data.js";


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

  // UPDATE STATE WITH API DATA
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${id}`
    ).then((res) => {
      // console.log("res", res.data);
      setState(prev => ({ ...prev, ...res.data }));
      setOriginalServings(res.data.servings);
    });
  }, []);

  // useEffect(() => {
  //   setState(prev => ({ ...prev, ...recipeInfo }));
  //   setOriginalServings(recipeInfo.servings);
  // }, []);




  //SERVING CALCULATOR
  const addServing = () => {
    setState({
      ...state,
      servings: state.servings + 1
    });
  };

  const minusServing = () => {
    if (state.servings > 1) {
      setState({
        ...state,
        servings: state.servings - 1
      });
    }
  };

  //ARRAY OF INGREDIENTS
  const ingredientsArray = [...state.ingredients];

  //maps over ingredientsArray to return list of ingredients
  const ingredientList = ingredientsArray.map((ingredient, index) => {

    let newServings = state.servings / originalServings;

    return (
      <ListItem key={index} py={2} borderBottom='1px' borderColor='gray.200'>
        { Number.isInteger(ingredient.amount * newServings) ? (ingredient.amount * newServings) : (ingredient.amount * newServings).toFixed(1) } {ingredient.unit} {ingredient.name}
      </ListItem>
    );
  });

  //creates an array of instructions
  const instructionsArray = [...state.instructions];

  //maps over instructionsArray to return a list of instructions
  const instructionsList = instructionsArray.map((instruction, index) => {
    return (
      <ListItem key={index} py={2} borderBottom='1px' borderColor='gray.200'>
        {instruction.step}
      </ListItem>
    );
  });

  //creates an array of nutrition
  const nutritionArray = [...state.nutrition];
  // console.log("nutritionArray", nutritionArray);

  //maps over instructionsArray to return a list of instructions
  const nutritionList = nutritionArray.map((nutrient, index) => {
    return (
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
      </Box>
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
          <HStack marginBottom={3}>

            <IconButton
              onClick={minusServing}
              borderRadius="50%"
              size="xs"
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              icon={<FaMinus />}
              aria-label='minus serving by one'
            />
            <Text py={2}>{state.servings} servings</Text>
            <IconButton
              onClick={addServing}
              borderRadius="50%"
              size="xs"
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              icon={<FaPlus />}
              aria-label='add serving by one'
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
