// External components and hooks
import { Tabs, TabList, TabPanels, useColorModeValue } from "@chakra-ui/react";

import IngredientsTab from "./IngredientsTab";
import InstructionsTab from "./InstructionsTab";
import NutritionTab from "./NutritionTab";
import TabButton from "./TabButton";

export default function RecipeDetailTabs(props) {
  const { servings, recipe } = props;

  const servingsMultiplier = servings / recipe.defaultServing;

  const tabButtons = ["Ingredients", "Instructions", "Nutrition"]
    .map(tabName => <TabButton>{tabName}</TabButton>);

  return (
    <Tabs isFitted variant="enclosed" width="45vw" h="42rem" bg={useColorModeValue("white", "gray.700")} rounded="lg" boxShadow="lg">
      <TabList>
        {tabButtons}
      </TabList>
      <TabPanels
        h="93%"
        padding="1em"
      >
        <IngredientsTab
          servingsMultiplier={servingsMultiplier}
          ingredients={recipe.ingredients}
        />
        <InstructionsTab
          instructions={recipe.instructions}
        />
        <NutritionTab
          nutrition= {recipe.nutrition}
        />
      </TabPanels>
    </Tabs>

  );
}
