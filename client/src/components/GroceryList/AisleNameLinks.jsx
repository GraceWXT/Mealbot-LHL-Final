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

export default function AisleNameLinks(props) {
  const { aisles } = props;
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

  });
}
