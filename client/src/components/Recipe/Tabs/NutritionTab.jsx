import { TabPanel, HStack, Text, ListItem, List} from "@chakra-ui/react";

export default function NutritionTab(props) {
  const { nutrition } = props;

  const nutritionList = nutrition.map((nutrient, index) => {
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
    <TabPanel h="100%" >
      <List h="100%" overflow="auto">
        {nutritionList}
      </List>
    </TabPanel>
  );
}
