import { ListItem, Checkbox} from "@chakra-ui/react";

export default function AisleListItem(props) {
  const { item } = props;
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
}
