import { ListItem, Checkbox} from "@chakra-ui/react";

export default function AisleListItem(props) {
  const { item } = props;
  const { amount, unit } = item.measures.metric;
  const quantity = `${Number(amount.toFixed(2))} ${unit}`;

  return (
    <ListItem key={item.id} py={2} borderBottom='1px' borderColor='gray.200'>
      <Checkbox colorScheme="green" spacing="1rem" width="100%">
        {quantity} {item.name}
      </Checkbox>
    </ListItem>
  );
}
