import { Heading, VStack, List, ListItem, Checkbox} from "@chakra-ui/react";

export default function ListItems(props) {
  const { aisles } = props;
  aisles.map((aisle) => {
    // AISLE ITEMS
    const aisleItems = aisle.items.map(item => {
      const measurement = item.measures.metric;
      const { amount, unit } = measurement;
      const quantity = (`${Number(amount.toFixed(2))} ${unit}`);

      return (
        <ListItem key={item.id} py={2} borderBottom='1px' borderColor='gray.200'>
          <Checkbox colorScheme="green" spacing="1rem" width="100%">
            {quantity} {item.name}
          </Checkbox>
        </ListItem>
      );
    });

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
  });
}
