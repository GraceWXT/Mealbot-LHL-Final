// External components and hooks
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Center, HStack, VStack,
  Heading, IconButton, Tooltip, Button,
  Drawer, DrawerBody, DrawerOverlay, DrawerContent, useDisclosure, useColorModeValue, useClipboard, useToast
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { MdOutlineTextsms } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

//IMPORT REACT RESPONSIVE
import { useMediaQuery } from "react-responsive";

// Internal components and helpers
import AisleNameListItem from "./AisleNameListItem";
import AisleListItems from "./AisleListItems";
import groceryListProcessor from "helpers/grocerylist-helper";
import AisleNameNav from "./AisleNameNav";

export default function GroceryList() {
  // Get start date from url
  const { startDate } = useParams();

  // Get grocerylist data and store in a state
  const [ aisles, setAisles ] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/grocerylist/${startDate}`)
      .then(res => {
        const filteredAisles = groceryListProcessor(res.data.aisles);
        setAisles(filteredAisles);
      }).catch(err => {
        console.log("Error: ", err.message);
      });
  }, [startDate, setAisles]);

  // TWILIO BUTTON
  const toast = useToast();

  const sendTwilio = () => {
    axios.post("http://localhost:8080/api/twilio", aisles)
      .then(res => {
        console.log(res);
        toast({
          title: "Grocery List Sent!",
          description: "You will receive the text shortly.",
          status: "success",
          variant: "subtle",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(err => {
        console.log("sendTwilio Error:", err.message);
      });
  };

  // COPY FEATURE
  const [value, setValue] = useState("");
  const { hasCopied, onCopy } = useClipboard(value);

  // Set aisles as dependency so if aisles data changes the text is also updated with new data
  useEffect(() => {
    let textMessage = "";
    if (aisles)
      aisles.forEach((aisle) => {
        // Add upper case aisle name to the text message
        const aisleName = aisle["aisle"].toUpperCase();
        textMessage += `\n${aisleName}\n`;
        // Add each item in teh aisle to the text message
        aisle.items.forEach(item => {
          textMessage += `
          -${item.measures.metric.amount} ${item.measures.metric.unit} ${item.name}\n
          `;
        });
      });
    setValue(textMessage);
  }, [aisles]);

  //useDisclosure for SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isTablet = useMediaQuery({ maxWidth: 991 });

  const tabletAislesButton = (
    <Button
      size="sm"
      leftIcon={<GiHamburgerMenu />}
      colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
      onClick={onOpen}>
  Aisles
    </Button>);

  // Map over the datat to render aisle name links and items
  const aislesWithListItems = aisles.length ? aisles.map(aisle => <AisleListItems key={aisle.aisle} aisle={aisle} />) : null;

  const aisleNameListItems = aisles.length ?
    aisles.map(aisle => <AisleNameListItem key={aisle.aisle} aisle={aisle} handleClick={onClose}/>)
    : null;

  return (
    <Center
      width="100vw"
      h="92vh"
    >
      <HStack
        height={isTablet ? "100%" : "80vh"}
        spacing={isTablet ? undefined : "2vw"}
        width={isTablet ? undefined : "fit-content"}
        justifyContent="center"
      >
        {/* Aisles Navigation*/}
        {isTablet ?
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody>
                <AisleNameNav isTablet={isTablet}>{aisleNameListItems}</AisleNameNav>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          :
          <AisleNameNav isTablet={isTablet}>{aisleNameListItems}</AisleNameNav>}


        {/* Grocery List Items Container*/}
        <VStack
          height="100%"
          bg={useColorModeValue("white", "gray.700")}
          padding={isTablet ? "0.8em" : "2em"}
          maxW={isTablet ? "100vw" : undefined}
          w={isTablet ? undefined : "fit-content"}
          minWidth={isTablet ? undefined : "35em"}
          boxShadow={isTablet ? undefined : "rgba(0, 0, 0, 0.05) 0px 0px 12px 2px"}
          borderRadius={isTablet ? undefined : "lg"}
        >

          {/* Grocery List heading and buttons Div */}
          <HStack width="100%" justifyContent="space-between" spacing={4} >
            <HStack>
              {isTablet ? tabletAislesButton : null}
              <Heading fontSize={isTablet ? "1.5em" : "1.8em"} >Grocery List</Heading>
            </HStack>
            <HStack >
              <Tooltip label={hasCopied ? "Copied!" : "Copy to your clipboard"} closeOnClick={false}>
                <IconButton
                  onClick={onCopy}
                  aria-label="copy grocery list"
                  icon={<CopyIcon />}
                  colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                  borderRadius="50%"
                  size={isTablet ? "sm" : "md"}
                />
              </Tooltip>
              <Tooltip label="Send as text message" closeOnClick={false}>
                <IconButton
                  onClick={sendTwilio}
                  icon={<MdOutlineTextsms />}
                  colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                  borderRadius="50%"
                  size={isTablet ? "sm" : "md"}
                />
              </Tooltip>
            </HStack>
          </HStack>

          {/* Aisle List items Div */}
          <VStack
            height="full"
            scrollBehavior={isTablet ? undefined : "smooth"}
            padding="1em"
            width="100%"
            alignItems="flex-start"
            overflow="auto">
            {aislesWithListItems}
          </VStack>
        </VStack>
      </HStack>
    </Center>
  );
}
