import { Link, ListItem} from "@chakra-ui/react";

export default function AisleNameListItem(props) {
  const { aisle } = props;

  const linkText = aisle.aisle.replaceAll(" ", "-");

  return (
    <ListItem key={aisle.aisle} py={1} fontWeight="500" borderBottom='1px' borderColor='gray.200'>
      <Link href={`#${linkText}`}>
        {aisle.aisle}
      </Link>
    </ListItem>
  );
}
