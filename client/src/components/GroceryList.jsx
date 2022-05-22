import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useOutletContext } from "react-router-dom";
//IMPORT CHAKRA COMPONENTS
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
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react";

//IMPORT CHAKRA ICONS
import { CopyIcon, ChatIcon } from "@chakra-ui/icons";

//IMPORT REACT ICONS
import { MdOutlineTextsms } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

//IMPORT REACT RESPONSIVE
import { MediaQuery, useMediaQuery } from 'react-responsive';


//IMPORT MOCK GROCERY LIST DATA
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

  //useDisclosure for SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();

  // AISLE NAMES
  const linkofAisleNames = aisles.map(aisle => {

    const linkText = aisle.aisle.replaceAll(" ", "-");
    if (!filter.includes(aisle.aisle)) {
      return (
        <ListItem key={aisle.aisle} py={0.5} borderBottom='1px' borderColor='gray.200'>
          <Link href={`#${linkText}`} onClick={onClose}>
            {aisle.aisle}
          </Link>
        </ListItem>
      );
    }

  });

  //TWILIO BUTTON
  const toast = useToast();

  const sendTwilio = () => {
    axios.post('http://localhost:8080/api/twilio', aisles)
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });

    toast({
      title: 'Grocery List Sent!',
      description: 'You will receive the text shortly.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom'
    });
  };

  //COPY FEATURE
  const [value, setValue] = useState("");
  const { hasCopied, onCopy } = useClipboard(value);

  const formatGroceryList = () => {
    let textMessage = ``;

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
  };

  //put aisles as dependency so if aisles data changes the formatGroceryList copy function also updates with new data
  useEffect(() => {
    formatGroceryList();
  }, [aisles]);



  //RESPONSIVE DESIGNS CONSTANTS
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ maxWidth: 991 });
    return isTablet ? children : null;
  };


  // ITEMS QUANTITY

  // GROCERY LIST
  const listOfAisleItems = aisles.map((aisle) => {

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

  });

  return (
    <Center width="100vw" position="absolute">
      <VStack py={2}>

        {/* AISLES */}
        <Tablet>
          {/* <VStack> */}

          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              {/* <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader> */}
              <DrawerBody>
                <VStack
                  height="100%"
                  padding="20px"
                  bg={useColorModeValue("white", "gray.700")}
                // boxShadow="lg"
                // borderRadius="lg"
                >
                  <Heading fontSize="1.8rem" >Aisles</Heading>
                  <DrawerCloseButton />
                  <List padding="1em" width="100%">
                    {linkofAisleNames}
                  </List>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          {/* </VStack> */}
          <Container
            marginTop="5vh"
            width="75wh"
            height="80vh"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
            borderRadius="lg">
            <HStack justifyContent="center" position="sticky" padding="20px" >
              <Button leftIcon={<GiHamburgerMenu />} colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")} onClick={onOpen}>
                Aisles
              </Button>
              <BsCart4 />
              <Heading fontSize="1.8rem" >Grocery List</Heading>
              <Tooltip label={hasCopied ? 'Copied!' : 'Copy the grocery list'} closeOnClick={false}>
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
                  icon={<MdOutlineTextsms boxSize={5} />}
                  colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                  borderRadius="50%"
                  size="sm" />
              </Tooltip>
            </HStack>
            <List height="75%" overflow="auto" >
              {listOfAisleItems}
            </List>
          </Container>
        </Tablet>

        <Desktop>
          <HStack
            height="80vh"
            width="80vw"
            justifyContent="center"
            marginTop="5vh" >
            <VStack
              height="100%"
              padding="20px"
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="lg"
              borderRadius="lg">
              <Heading fontSize="1.8rem" >Aisles</Heading>
              <List padding="1em">
                {linkofAisleNames}
              </List>
            </VStack>
            <Container
              width="50%"
              height="100%"
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="lg"
              borderRadius="lg">
              <HStack justifyContent="center" position="sticky" padding="20px" >
                <BsCart4 />
                <Heading fontSize="1.8rem" >Grocery List</Heading>
                <Tooltip label={hasCopied ? 'Copied!' : 'Copy the grocery list'} closeOnClick={false}>
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
                    icon={<MdOutlineTextsms boxSize={5} />}
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
        </Desktop>

      </VStack >
    </Center>
  );
}
