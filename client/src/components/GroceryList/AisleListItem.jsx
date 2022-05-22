import { ListItem, HStack, Checkbox, Text} from "@chakra-ui/react";

export default function AisleListItem(props) {
  const { item } = props;
  const { amount, unit } = item.measures.metric;
  const quantity = `${Number(amount.toFixed(2))} ${unit}`;

  return (
    <ListItem key={item.id} py={2} borderBottom='1px' borderColor='gray.200'>
      <HStack justifyContent="space-between">
        <Checkbox
          colorScheme="turquoiseGreen"
          spacing="1rem"
          fontWeight="500"
          fontSize="md"
        >
          {item.name}
        </Checkbox>
        <Text minW="fit-content">
          {quantity}
        </Text>
      </HStack>
    </ListItem>
  );
}
