import {
  Box,
  Image,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useColorMode,
  FormControl,
  FormLabel,
  Switch
} from "@chakra-ui/react";

export default function Navbar(props) {
  const { user } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box as="nav"
        height="8vh"
        minH="50px"
        bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
        display="flex" justifyContent={"space-between"} alignItems={"center"}
        padding="0 2vw"
      >
        <HStack alignItems={"center"}>
          <Image boxSize="6vh" minBlockSize="5vh" align={"center"} src="https://cdn-icons-png.flaticon.com/512/1129/1129149.png" />
          <Link href="/" fontSize="2rem" id="logo">Mealbot</Link>
        </HStack>
        <Flex alignItems={"center"}>
          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
              {colorMode === "light" ? "☀️" : "🌚"}
            </FormLabel>
            <Switch
              colorScheme="gray"
              onChange={toggleColorMode}
            />
          </FormControl>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}>
              <Avatar
                size={"md"}
                src={user.img_url ? `${user.img_url}` : null}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href={`/users/${user.id}`} >User Profile</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>Meal Plan</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  );
}
