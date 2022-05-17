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

export default function Recipe() {
  const [state, setState] = useState({
    ingredients: [],
    instructions: [],
    nutrition: [],
    title: "",
    readyInMinutes: "",
    image: ""
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
    <HStack>
      <Container w="40%" py={20}>
        <Heading as='h3' size='md'>{state.title}</Heading>
        <Text>Ready in {state.readyInMinutes}min</Text>
        <Image src={state.image} py={5}/>
      </Container>

      <Divider orientation='vertical'/>

      <Tabs isFitted variant='enclosed' w="60%" align="top">
        <TabList mb='1em'>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
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

    </HStack>

  );
}
