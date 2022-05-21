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

import AisleNameLinks from "./AisleNameLinks";
import ListItems from "./ListItems";
import filter from "./filter";

export default function GroceryList() {
  // get start date from url
  const { startDate } = useParams();

  // get grocerylist data and store in a state
  const [ aisles, setAisles ] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/grocerylist/${startDate}`)
      .then(res => {
        const filteredAisles = res.data.aisles
          .filter(aisle => !filter.includes(aisle["aisle"]));
        setAisles(filteredAisles);
      }).catch(err => {
        console.log("Error: ", err.message);
      });
  }, [startDate, setAisles]);

  //TWILIO BUTTON
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

  //COPY FEATURE
  const [value, setValue] = useState("");
  const { hasCopied, onCopy } = useClipboard(value);

  //put aisles as dependency so if aisles data changes the formatGroceryList copy function also updates with new data
  useEffect(() => {
    let textMessage = "";

    if (aisles)
    //aisleItem cannot be named aisle otherwise will conflict with database key name and won't work
      aisles.map((aisleItem) => {
        const aisle = aisleItem.aisle.toUpperCase();

        textMessage += `\n${aisle}\n`;

        aisleItem.items.map(item => {
          const ingredient = `-${item.measures.metric.amount} ${item.measures.metric.unit} ${item.name}\n`;
          textMessage += ingredient;
        });
      });
    setValue(textMessage);
  }, [aisles]);


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
              {aisles ? <AisleNameLinks aisles={aisles}/> : null}
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
              {aisles ? <ListItems aisles={aisles} /> : null}
            </List>
          </Container>
        </HStack>
      </VStack >
    </Center>
  );
}
