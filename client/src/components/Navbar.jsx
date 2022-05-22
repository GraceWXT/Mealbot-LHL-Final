import {
  HStack,
  Heading, Image, Avatar, Button, Icon,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  FormControl, FormLabel, Switch,
  useColorModeValue, useColorMode
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
      <HStack
        as="nav"
        height="8vh"
        minH="50px"
        bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
        display="flex" justifyContent={"space-between"} alignItems={"center"}
        px="3vw"
        boxShadow="rgba(0, 0, 0, 0.08) 0px 0px 12px 0px"
      >
        <Link to="/">
          <HStack>
            <Image boxSize="6vh" minBlockSize="5vh" align="center" src="https://cdn-icons-png.flaticon.com/512/1129/1129149.png" />
            <Heading fontSize="4xl" id="logo">Mealbot</Heading>
          </HStack>
        </Link>
        <HStack spacing={5}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="color-mode" mb="0">
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
              minW="fit-content">
              <Avatar
                size={"md"}
                src={user.img_url ? `${user.img_url}` : null}
              />
            </MenuButton>
            <MenuList>
              <Link to={`/users/${user.id}`} >
                <MenuItem>
                  <Icon boxSize="1.2em" marginRight="0.5em" as={BiUserCircle}></Icon>
                  Profile
                </MenuItem>
              </Link>
              <MenuDivider />
              <Link to={`mealplan/${currentMonday}`}>
                <MenuItem onClick={() => setStartDate(currentMonday) } >
                  <Icon boxSize="0.9em" marginRight="0.5em" as={BsCalendar3}></Icon>
                  Meal Planner
                </MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem>
                <Icon boxSize="1em" marginRight="0.5em" as={MdOutlineLogout}></Icon>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </>
  );
}
