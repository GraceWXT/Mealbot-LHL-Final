import { ReactNode } from 'react';
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
  Heading,
} from '@chakra-ui/react';

export default function Navbar() {

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={5}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={2} alignItems={'center'}>
            <Box boxSize='50px'>
              <Image marginTop={1.5} boxSize='35px' align={'center'} src='https://cdn-icons-png.flaticon.com/512/1129/1129149.png' />
            </Box>
            <h1 id='logo'>Mealbot</h1>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://i.imgur.com/dsTjcWuh.jpg'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href='https://chakra-ui.com' isExternal>User Profile</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>Meal Plan</MenuItem>
                <MenuDivider />
                <MenuItem>Grocery List</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}
