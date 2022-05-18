import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  IconButton,
  Heading,
  Link,
  Center,
  Divider,
  HStack,
  VStack,
  Container,
  List,
  ListItem,
  Checkbox,
  useColorModeValue
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

import groceryList from "./grocery-list-data";

export default function GroceryList() {

  //aisles.items.measures.metric

  // get start date from react router
  const { startDate } = useParams();

  // get grocerylist data
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/grocerylist/${startDate}`)
  //     .then(res => {
  //       const groceryList = res.data;
  //       console.log(groceryList);
  //     }).catch(err => {
  //       console.log("Error: ", err.message);
  //     });
  // }, []);

  const { aisles } = groceryList;

  // AISLE NAMES
  const linkofAisleNames = aisles.map(aisle => {

    const linkText = aisle.aisle.replaceAll(" ", "-");
    return (
      <ListItem key={aisle.aisle}>
        <Link href={`#${linkText}`}>
          {aisle.aisle}
        </Link>
      </ListItem>
    );
  });

  // GROCERY LIST
  const listOfAisleItems = aisles.map((aisle) => {

    // AISLE ITEMS
    const aisleItems = aisle.items.map(item => {
      return (
        <ListItem key={item.id}>
          <Checkbox colorScheme="green" spacing="1rem">
            {item.name}
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

  return (
    <Center width="100vw" >
      <HStack height="80vh" width="80vw" border="1px" borderRadius="lg" justifyContent="center" marginTop="5vh" >
        {/* AISLES */}
        <VStack height="100%" padding="20px">
          <Heading fontSize="1.8rem" >Aisles</Heading>
          <List padding="1em" >
            {linkofAisleNames}
          </List>
        </VStack>

        <Container width="30%" height="100%"  >
          <HStack justifyContent="center" position="sticky" padding="20px" >
            <Heading fontSize="1.8rem" >Grocery List</Heading>
            <IconButton
              aria-label='copy grocery list'
              icon={<CopyIcon />}
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              borderRadius="50%"
              size="xs"
            />
          </HStack>
          <List height="85%" overflow="scroll">
            {listOfAisleItems}
          </List>
        </Container>
      </HStack>
    </Center>
  );
}
