import { Heading, VStack, List} from "@chakra-ui/react";
import AisleListItem from "./AisleListItem";

export default function AisleListItems(props) {
  const { aisle } = props;

  // Ingredient items in each aisle
  const aisleItems = aisle.items.map(item => <AisleListItem item={item} />);

  // id to match the nav link href
  const linkText = aisle.aisle.replaceAll(" ", "-");

  return (
    <VStack
      key={`${aisle.aisle} - ${aisleItems.length}`}
      margin="1em"
      alignItems="start" >
      <Heading fontSize="large" id={`${linkText}`}>
        {aisle.aisle}
      </Heading>
      <List textAlign="start" >
        {aisleItems}
      </List>
    </VStack>
  );
}
