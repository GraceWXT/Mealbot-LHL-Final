import axios from "axios";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

//chakra-ui & icon imports
import {
  HStack, Container, Spacer, Heading,
  useColorModeValue,
  IconButton, UnorderedList, ListItem,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";


export default function PantryItemsColumn() {
  const { pantryItems, setPantryItems } = useOutletContext();

  useEffect(() => {
    axios.get("http://localhost:8080/api/pantryitems"
    ).then((res) => {
      // console.log("res", res.data);
      console.log("pantryItems",res.data);
      setPantryItems(res.data);
    }).catch(err => {
      console.log("Error: ", err.message);
    });
  }, []);

  const getPantryItems = pantryItems.map((item, index) => {
    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        {item.name}
      </ListItem>
    );
  });

  return (
    <Container
      boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 12px 2px"
      bg={useColorModeValue("white", "blackAlpha.900")}
      w="30vw"
      height="100%"
      rounded="lg"
      padding="2rem"
    >
      <HStack>
        <Heading as="h2" size="md">Pantry Items</Heading>
        <Spacer />
        <IconButton
          size="sm"
          icon={<EditIcon />}
          bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
          _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
          _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
          _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
        />
      </HStack>
      <UnorderedList>
        {getPantryItems}
      </UnorderedList>
    </Container>
  );
}
