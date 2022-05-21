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
  useClipboard,
  useToast
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { MdOutlineTextsms } from "react-icons/md";


export default function GroceryList() {
  // get start date from react router
  const { startDate } = useParams();
  const [groceryList, setgroceryList] = useState({});
  // get grocerylist data
  useEffect(() => {
    axios.get(`http://localhost:8080/api/grocerylist/${startDate}`)
      .then(res => {
        setgroceryList(res.data);
      }).catch(err => {
        console.log("Error: ", err.message);
      });
  }, [startDate, setgroceryList]);

  const { aisles } = groceryList;

  //FILTER OUT
  const filter = ["Oil, Vinegar, Salad Dressing", "Spices and Seasonings", "Condiments", "Pantry Items", "Sweet Snacks", "Dried Fruits", "Ethnic Foods", "Generic", "Savory Snacks", "Nut butters, Jams, and Honey", "Alcoholic Beverages"];


  // AISLE NAMES
  const aisleNameLinks = aisles ?
    aisles.map(aisleObj => {
      const linkText = aisleObj.aisle.replaceAll(" ", "-");
      if (!filter.includes(aisleObj.aisle)) {
        return (
          <ListItem key={aisleObj.aisle} py={0.5} borderBottom='1px' borderColor='gray.200'>
            <Link href={`#${linkText}`}>
              {aisleObj.aisle}
            </Link>
          </ListItem>
        );
      }

    }) : null;

  //TWILIO BUTTON
  const toast = useToast();

  const sendTwilio = () => {
    axios.post("http://localhost:8080/api/twilio", aisles)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("sendTwilio Error:", err.message);
      });

    toast({
      title: "Grocery List Sent!",
      description: "You will receive the text shortly.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom"
    });
  };

  //COPY FEATURE
  const [value, setValue] = useState("");
  const { hasCopied, onCopy } = useClipboard(value);

  //put aisles as dependency so if aisles data changes the formatGroceryList copy function also updates with new data
  useEffect(() => {
    let textMessage = "";

    if (aisles)
    //aisleItem cannot be named aisle otherwise will conflict with database key name and won't work
      aisles.map((aisleItem) => {
        if (!filter.includes(aisleItem.aisle)) {
          const aisle = aisleItem.aisle.toUpperCase();

          textMessage += `\n${aisle}\n`;

          aisleItem.items.map(item => {
            const ingredient = `-${item.measures.metric.amount} ${item.measures.metric.unit} ${item.name}\n`;
            textMessage += ingredient;
          });
        }
      });

    setValue(textMessage);
  }, [aisles, filter]);


  // ITEMS QUANTITY

  // GROCERY LIST
  const listOfAisleItems = aisles ?
    aisles.map((aisle) => {

      if (!filter.includes(aisle.aisle)) {
      // AISLE ITEMS
        const aisleItems = aisle.items.map(item => {
          const measurement = item.measures.metric;
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

    }) : null;

  return (
    <Center width="100vw" position="absolute">
      <VStack py={2}>
        <HStack
          height="80vh"
          width="80vw"
          // bg={useColorModeValue("white", "gray.700")}
          // boxShadow="lg"
          // borderRadius="lg"
          justifyContent="center"
          marginTop="5vh" >
          {/* AISLES */}
          <VStack
            height="100%"
            padding="20px"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
            borderRadius="lg">
            <Heading fontSize="1.8rem" >Aisles</Heading>
            <List padding="1em">
              {aisleNameLinks}
            </List>
          </VStack>

          <Container
            width="50%"
            height="100%"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
            borderRadius="lg">
            <HStack justifyContent="center" position="sticky" padding="20px" >
              <Heading fontSize="1.8rem" >Grocery List</Heading>
              <Tooltip label={hasCopied ? "Copied!" : "Copy the grocery list"} closeOnClick={false}>
                <IconButton
                  onClick={onCopy}
                  aria-label='copy grocery list'
                  icon={<CopyIcon />}
                  colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                  borderRadius="50%"
                  size="sm"
                />
              </Tooltip>
              <Text></Text>
              <Tooltip label="Send as text message" closeOnClick={false}>
                <IconButton
                  onClick={sendTwilio}
                  icon={<MdOutlineTextsms boxSize={20} />}
                  colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                  borderRadius="50%"
                  size="sm" />
              </Tooltip>
            </HStack>
            <List height="85%" overflow="auto">
              {listOfAisleItems}
            </List>
          </Container>
        </HStack>
      </VStack >
    </Center>
  );
}
