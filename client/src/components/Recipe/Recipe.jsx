import React, { useState, useEffect } from "react";
import axios from "axios";

// External components and hooks
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
  HStack, Center, VStack,
  Image, Heading, Text, Button, IconButton,
  ListItem, List, UnorderedList,
  useColorModeValue
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import { ArrowBackIcon } from "@chakra-ui/icons";

import { useOutletContext, useParams, Link } from "react-router-dom";
import RecipeBasicInfo from "./RecipeBasicInfo";
import BackButton from "./BackButton";

// import recipeInfo from "./recipe-data.js";

export default function Recipe() {

  const [recipe, setRecipe] = useState({});
  const [servings, setServings] = useState(0);

  // UPDATE STATE WITH API DATA
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${id}`
    ).then((res) => {
      setRecipe({...res.data});
      setServings(res.data.defaultServing);
    });
  }, [id]);

  //ARRAY OF INGREDIENTS
  const ingredientsArray = [...recipe.ingredients];

  //maps over ingredientsArray to return list of ingredients
  const ingredientList = ingredientsArray.map((ingredient, index) => {

    let newServings = servings / recipe.defaultServing;

    const ingredientAmount = Number.isInteger(ingredient.amount * newServings) ?
      (ingredient.amount * newServings)
      : (ingredient.amount * newServings).toFixed(1);

    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        {`${ingredientAmount} ${ingredient.unit} ${ingredient.name}`}
      </ListItem>
    );
  });

  //creates an array of instructions
  const instructionsArray = [...recipe.instructions];

  //maps over instructionsArray to return a list of instructions
  const instructionsList = instructionsArray.map((instruction, index) => {
    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        <HStack spacing={5}>
          <Text fontWeight="500">{instruction.number}</Text>
          <Text>{instruction.step}</Text>
        </HStack>
      </ListItem>
    );
  });

  //creates an array of nutrition
  const nutritionArray = [...recipe.nutrition];
  // console.log("nutritionArray", nutritionArray);

  //maps over instructionsArray to return a list of instructions
  const nutritionList = nutritionArray.map((nutrient, index) => {
    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        <HStack justifyContent="space-between">
          <Text fontWeight="semibold">
            {nutrient.name}
          </Text>
          <Text>
            {nutrient.amount} {nutrient.unit}
          </Text>
        </HStack>
      </ListItem>
    );
  });

  return (
    <Center h="92vh" minH="45rem">
      <HStack alignItems="start" spacing={12}>
        <VStack alignItems="start" spacing={6} h="100%">
          <BackButton />
          <RecipeBasicInfo recipe={recipe} setServings={setServings} />
        </VStack>

        <Tabs isFitted variant="enclosed" width="45vw" h="42rem" bg={useColorModeValue("white", "gray.700")} rounded="lg" boxShadow="lg">
          <TabList>
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label="recipe ingredients tab"
            >Ingredients</Tab>
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label="recipe instructions tab"
            >Instructions</Tab>
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label="recipe nutrition tab"
            >Nutrition</Tab>
          </TabList>
          <TabPanels
            h="93%"
            padding="1em"
          >
            <TabPanel h="100%" >
              <UnorderedList
                h="100%"
                listStylePosition="inside"
                marginInlineStart={0}
                overflowY="auto"
              >
                {ingredientList}
              </UnorderedList>
            </TabPanel>
            <TabPanel h="100%" >
              <List h="100%" overflow="auto">
                {instructionsList}
              </List>
            </TabPanel>
            <TabPanel h="100%" >
              <List h="100%" overflow="auto">
                {nutritionList}
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </Center>
  );
}
