// External components and hooks
import { TabPanel, Tabs, TabList, TabPanels, useColorModeValue } from "@chakra-ui/react";

import IngredientsList from "./IngredientsList";
import InstructionsList from "./InstructionsList";
import NutritionList from "./NutritionList";
import TabButton from "./TabButton";

export default function RecipeDetailTabs(props) {
  const { servings, recipe } = props;

  const servingsMultiplier = servings / recipe.defaultServing;

  const tabButtons = ["Ingredients", "Instructions", "Nutrition"]
    .map(tabName => <TabButton key={tabName}>{tabName}</TabButton>);

  return (
    <Tabs isFitted variant="enclosed" width="45vw" h="42rem" bg={useColorModeValue("white", "gray.700")} rounded="lg" boxShadow="lg">
      <TabList>
        {tabButtons}
      </TabList>
      <TabPanels
        h="93%"
        padding="1em"
      >
        <TabPanel h="100%" >
          <IngredientsList
            servingsMultiplier={servingsMultiplier}
            ingredients={recipe.ingredients}
          />
        </TabPanel>
        <TabPanel h="100%" >
          <InstructionsList
            instructions={recipe.instructions}
          />
        </TabPanel>
        <TabPanel h="100%" >
          <NutritionList
            nutrition= {recipe.nutrition}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>

  );
}
