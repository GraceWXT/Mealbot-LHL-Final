import { Heading, VStack, List} from "@chakra-ui/react";
import AisleListItem from "./AisleListItem";

export default function AisleListItems(props) {
  const { aisle } = props;

  // Ingredient items in each aisle
  const aisleItems = aisle.items.map(item => <AisleListItem key={item.id}item={item} />);

  // id to match the nav link href
  const linkText = aisle.aisle.replaceAll(" ", "-");

  return (
    <VStack
      width="100%"
      alignItems="start" >
      <Heading marginY="0.3em" fontSize="large" fontWeight="semibold" id={`${linkText}`}>
        {aisle.aisle}
      </Heading>
      <List
        width="100%"
        textAlign="start" >
        {aisleItems}
      </List>
    </VStack>
  );
}
