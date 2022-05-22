// External components and hooks
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Center, HStack, VStack,
  Heading, List, IconButton, Tooltip,
  useColorModeValue, useClipboard, useToast
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { MdOutlineTextsms } from "react-icons/md";

// Internal components and helpers
import AisleNameListItem from "./AisleNameListItem";
import AisleListItems from "./AisleListItems";
import groceryListProcessor from "helpers/grocerylist-helper";

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

  // Map over the datat to render aisle name links and items
  const aislesWithListItems = aisles.length ? aisles.map(aisle => <AisleListItems key={aisle.aisle} aisle={aisle} />) : null;

  const aisleNameListItems = aisles.length ? aisles.map(aisle => <AisleNameListItem key={aisle.aisle} aisle={aisle} />) : null;

  return (
    <Center width="100vw" h="92vh">
      <HStack
        height="80vh"
        spacing="2vw"
        width="fit-content"
        justifyContent="center"
      >
        {/* Aisles Navigation*/}
        <VStack
          alignItems="flex-start"
          height="100%"
          padding="2em"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 12px 2px"
          borderRadius="lg">
          <Heading fontSize="1.8rem" >Aisles</Heading>
          <List minWidth="18em">
            {aisleNameListItems}
          </List>
        </VStack>

        {/* Grocery List Items*/}
        <VStack
          w="fit-content"
          minWidth="35em"
          height="100%"
          padding="2em"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 12px 2px"
          borderRadius="lg">

          {/* Grocery List heading and buttons Div */}
          <HStack width="100%" justifyContent="space-between" spacing={4} >
            <Heading fontSize="1.8rem" >Grocery List</Heading>
            <HStack >
              <Tooltip label={hasCopied ? "Copied!" : "Copy to your clipboard"} closeOnClick={false}>
                <IconButton
                  onClick={onCopy}
                  aria-label='copy grocery list'
                  icon={<CopyIcon />}
                  colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                  borderRadius="50%"
                  size="sm"
                />
              </Tooltip>
              <Tooltip label="Send as text message" closeOnClick={false}>
                <IconButton
                  onClick={sendTwilio}
                  icon={<MdOutlineTextsms boxSize={20} />}
                  colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
                  borderRadius="50%"
                  size="sm" />
              </Tooltip>
            </HStack>
          </HStack>

          {/* Aisle List items Div */}
          <VStack
            height="full"
            scrollBehavior="smooth"
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
