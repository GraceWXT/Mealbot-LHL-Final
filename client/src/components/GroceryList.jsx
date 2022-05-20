import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Flex,
  Text,
  Spacer,
  IconButton,
  Heading,
  Link,
  Center,
  HStack,
  VStack,
  Container,
  List,
  ListItem,
  Checkbox,
  useColorModeValue,
  Button,
  Tooltip,
  Input,
  useClipboard
} from "@chakra-ui/react";
import { CopyIcon, ChatIcon } from "@chakra-ui/icons";

import { MdOutlineTextsms } from "react-icons/md";


import groceryList from "./grocery-list-data";

export default function GroceryList() {

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

  //FILTER OUT
  const filter = ["Oil, Vinegar, Salad Dressing", "Spices and Seasonings", "Condiments", "Pantry Items", "Sweet Snacks", "Dried Fruits", "Ethnic Foods", "Generic", "Savory Snacks", "Nut butters, Jams, and Honey", "Alcoholic Beverages"];


  // AISLE NAMES
  const linkofAisleNames = aisles.map(aisle => {

    const linkText = aisle.aisle.replaceAll(" ", "-");
    if (!filter.includes(aisle.aisle)) {
      return (
        <ListItem key={aisle.aisle} py={0.5} borderBottom='1px' borderColor='gray.200'>
          <Link href={`#${linkText}`}>
            {aisle.aisle}
          </Link>
        </ListItem>
      );
    }

  });

  // Twilio Button

  const sendTwilio = () => {
    // console.log('test', aisles);
    axios.post('http://localhost:8080/api/twilio', aisles)
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //COPY FEATURE
  const [value, setValue] = useState("");
  const { hasCopied, onCopy } = useClipboard(value);

  const copyGroceryList = () => {
    let textMessage = "";

    aisles.map((aisle) => {
      if (!filter.includes(aisle.aisle)) {
        const aisle = aisle.aisle.toUpperCase();

        textMessage += `\n${aisle}\n`;

        aisle.items.map(item => {
          const ingredient = `-${item.measures.metric.amount} ${item.measures.metric.unit} ${item.name}\n`;
          textMessage += ingredient;
        });
      }
    });
    setValue(textMessage);
    return textMessage;
  };



  // ITEMS QUANTITY



  // GROCERY LIST
  const listOfAisleItems = aisles.map((aisle) => {

    if (!filter.includes(aisle.aisle)) {
      // AISLE ITEMS
      const aisleItems = aisle.items.map(item => {
        const measurement = item.measures.original;
        const { amount, unit } = measurement;
        const quantity = (`${Number(amount.toFixed(2))} ${unit}`);
        // console.log(quantity);
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
    }

  });

  return (
    <Center width="100vw" position="absolute">
      <VStack py={2}>
        <HStack height="80vh" width="80vw" bg={useColorModeValue("white", "gray.700")} boxShadow="xl" borderRadius="lg" justifyContent="center" marginTop="5vh" >
          {/* AISLES */}
          <VStack height="100%" padding="20px">
            <Heading fontSize="1.8rem" >Aisles</Heading>
            <List padding="1em">
              {linkofAisleNames}
            </List>
          </VStack>

          <Container width="50%" height="100%"  >
            <HStack justifyContent="center" position="sticky" padding="20px" >
              <Heading fontSize="1.8rem" >Grocery List</Heading>
              <IconButton
                onClick={onCopy}
                aria-label='copy grocery list'
                icon={<CopyIcon />}
                colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                borderRadius="50%"
                size="sm"
              />
              <Tooltip label='Text the grocery list to your saved phone number'>
                <IconButton
                  onClick={sendTwilio}
                  icon={<MdOutlineTextsms boxSize={20} />}
                  colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                  borderRadius="50%"
                  size="sm" />
              </Tooltip>
            </HStack>
            <List height="85%" overflow="scroll">
              {listOfAisleItems}
            </List>
          </Container>
        </HStack>
      </VStack >
    </Center>
  );
}
