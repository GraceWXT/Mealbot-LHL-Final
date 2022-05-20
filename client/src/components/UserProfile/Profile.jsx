import { useOutletContext } from "react-router-dom";

//chakra-ui & icon imports
import {
  VStack, HStack, Center, Avatar, Heading,
  useColorModeValue,
  IconButton, Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import Preferences from "./Preferences";
import PantryItemsColumn from "./PantryItemsColumn";

export default function Profile() {
  // grab info from outlet context
  const { user } = useOutletContext();

  return (
    <Center height="92vh">
      <HStack
        spacing="2vw"
        justifyContent="center"
        w="80%"
        height="70vh"
      >
        {/* User profile: avatar and info */}
        <VStack
          justifyContent="center"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 12px 2px"
          bg={useColorModeValue("white", "blackAlpha.900")}
          w="30vw"
          height="100%"
          alignSelf="flex-start"
          rounded="lg"
          padding="2rem"
          spacing="10"
        >
          <Avatar
            src={user.img_url}
            name={`${user.first_name} ${user.last_name}`}
            boxSize="25vh"
            borderRadius="50%"
          />
          <Heading size="lg">{user.first_name} {user.last_name}</Heading>
          <Text fontWeight="semibold">{user.email}</Text>
          <Text>Phone number: 604-XXX-0189</Text>
          <IconButton
            size="sm"
            icon={<EditIcon />}
            bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
            _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
            _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
            _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
          />
        </VStack>

        {/* Preferences */}
        <Preferences />

        {/* Pantry Items */}
        <PantryItemsColumn />
      </HStack>

    </Center>
  );
}
