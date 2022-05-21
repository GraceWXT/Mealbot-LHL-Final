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

import filter from "./filter";

export default function ListItems(props) {
  const { aisles } = props;
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

  });
}
