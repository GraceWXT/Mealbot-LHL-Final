import {
  Box,
  Heading,
  Image,
  Avatar,
  HStack,
  Button,
  Icon,
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
import { BiUserCircle } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";

import { Link } from "react-router-dom";

import { getCurrentMondayDate } from "helpers/date-helper";

export default function Navbar(props) {
  const { user, setStartDate } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  const currentMonday = getCurrentMondayDate();

  return (
    <>
      <Box as="nav"
        height="8vh"
        minH="50px"
        bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
        display="flex" justifyContent={"space-between"} alignItems={"center"}
        padding="0 2vw"
        boxShadow="rgba(0, 0, 0, 0.10) 0px 0px 12px 0px"
      >
        <Link to="/">
          <HStack>
            <Image boxSize="6vh" minBlockSize="5vh" align={"center"} src="https://cdn-icons-png.flaticon.com/512/1129/1129149.png" />
            <Heading fontSize="2rem" id="logo">Mealbot</Heading>
          </HStack>
        </Link>
        <HStack>
          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='email-alerts' mb='0'>
              {colorMode === "light" ? "☀️" : "🌒"}
            </FormLabel>
            <Switch
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
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
                <Icon boxSize="1.2em" marginRight="0.5em" as={BiUserCircle}></Icon>
                <Link to={`/users/${user.id}`} >
                  Profile
                </Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => setStartDate(currentMonday) } >
                <Icon boxSize="0.9em" marginRight="0.5em" as={BsCalendar3}></Icon>
                <Link to={`mealplan/${currentMonday}`}>
                  Meal Planner
                </Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Icon boxSize="1em" marginRight="0.5em" as={MdOutlineLogout}></Icon>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </>
  );
}
