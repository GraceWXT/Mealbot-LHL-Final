import React, { useState, useEffect } from "react";
import axios from "axios";

//grab info from params
import { useParams } from "react-router-dom";

//chakra-ui components
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export default function Recipe() {
  const [state, setState] = useState({
    ingredients: [],
    instructions: [],
    nutrition: [],
    title: "",
    readyInMinutes: "",
    image: "",
    servings: ""
  });


  const { id } = useParams();
  console.log('id', id);

  // get data to update state
  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${id}`
    ).then((res) => {
      // console.log("res", res.data);
      setState(prev => ({ ...prev, ...res.data }));
    });
  }, []);
  console.log('state', state);

  return (
    <HStack alignItems="start">
      <Container w="40%" py={20}>
        <Heading as='h2' size='lg'>{state.title}</Heading>
        <Divider />
        <Text>Ready in {state.readyInMinutes}min</Text>
        <Divider />
        <Text>{state.servings} servings</Text>
        <Image src={state.image} py={5} />
      </Container>

      <Divider orientation='vertical' />

      {/* <VStack> */}
      <Tabs isFitted variant='enclosed' w="60%" py={20}>
        <TabList mb='1em'>
          <Tab>Ingredients</Tab>
          <Tab>Instructions</Tab>
          <Tab>Nutrition</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* </VStack> */}

    </HStack>

  );
}
