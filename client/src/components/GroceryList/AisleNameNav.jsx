// External components and hooks
import { VStack, Heading, List, DrawerCloseButton, useColorModeValue } from "@chakra-ui/react";

export default function AisleNameNav(props) {
  const { isTablet, children } = props;
  return (
    <VStack
      alignItems="flex-start"
      height="100%"
      padding="2em"
      overflow="auto"
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={isTablet ? undefined : "rgba(0, 0, 0, 0.05) 0px 0px 12px 2px"}
      borderRadius="lg">
      <Heading fontSize={isTablet ? "1rem" : "1.8rem"} >Aisles</Heading>
      {isTablet && <DrawerCloseButton />}
      <List
        minWidth={isTablet ? "100%" : "18em"}
      >
        { children }
      </List>
    </VStack>
  );
}
