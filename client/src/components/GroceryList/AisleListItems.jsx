import { Heading, VStack, List} from "@chakra-ui/react";
import AisleListItem from "./AisleListItem";

export default function AisleListItems(props) {
  const { aisle } = props;

  // AISLE ITEMS
  const aisleItems = aisle.items.map(item => <AisleListItem item={item} />);

  const linkText = aisle.aisle.replaceAll(" ", "-");

  return (
    <VStack
      key={`${aisle.aisle} - ${aisleItems.length}`}
      margin="1em"
      alignItems="start" >
      {/* AISLE LINKS TO NAV TO AISLE NAME*/}
      <Heading fontSize="large" id={`${linkText}`}>
        {aisle.aisle}
      </Heading>
      <List textAlign="start" >
        {aisleItems}
      </List>
    </VStack>
  );
}
