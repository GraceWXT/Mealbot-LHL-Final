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
import RecipeDetailTabs from "./Tabs/RecipeDetailTabs";
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

  return (
    <Center h="92vh" minH="45rem">
      <HStack alignItems="start" spacing={12}>
        <VStack alignItems="start" spacing={6} h="100%">
          <BackButton />
          <RecipeBasicInfo recipe={recipe} setServings={setServings} />
        </VStack>
        <RecipeDetailTabs servings={servings} recipe={recipe} />
      </HStack>
    </Center>
  );
}
