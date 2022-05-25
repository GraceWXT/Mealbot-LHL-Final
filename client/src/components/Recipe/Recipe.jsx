import React, { useState, useEffect } from "react";
import axios from "axios";

// External components and hooks
import { HStack, Center, VStack, Spinner} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

// Internal Components
import RecipeBasicInfo from "./RecipeBasicInfo";
import RecipeDetailTabs from "./Tabs/RecipeDetailTabs";
import BackButton from "./BackButton";

export default function Recipe() {

  const [recipe, setRecipe] = useState({loading: true});
  const [servings, setServings] = useState(0);

  // UPDATE STATE WITH API DATA
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${id}`
    ).then((res) => {
      setRecipe({...res.data, loading: false});
      setServings(res.data.defaultServing);
    });
  }, [id]);

  return (
    <Center h="92vh" minH="45rem">
      <HStack alignItems="start" spacing={12}>
        <VStack alignItems="start" spacing={6} h="100%">
          <BackButton />
          { recipe.loading ?
            <Center w="32rem" h="38rem">
              <Spinner
                label="loading"
                thickness="4px"
                speed="1s"
                emptyColor="gray.200"
                color="turquoiseGreen.500"
                size="xl"
              />
            </Center> :
            <RecipeBasicInfo recipe={recipe} servings={servings} setServings={setServings} />}
        </VStack>
        <RecipeDetailTabs servings={servings} recipe={recipe} />
      </HStack>
    </Center>
  );
}
