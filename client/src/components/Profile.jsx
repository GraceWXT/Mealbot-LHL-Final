import React, { useState, useEffect } from "react";
import axios from "axios";

//grab info from params
import { useParams } from "react-router-dom";


//chakra-ui imports
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useColorModeValue, useColorMode, } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';



export default function Profile() {
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    imgUrl: "",
    maxCalories: 0,
    maxTime: 0,
    servings: 0
  });

  const [pantryItems, setPantryItems] = useState([]);


  const userInfo = [
    {
      "id": 1,
      "first_name": "Gordon",
      "last_name": "Ramsay",
      "email": "idiotsandwich@email.com",
      "img_url": "https://i.imgur.com/dsTjcWuh.jpg",
      "max_calories": 800,
      "max_time": 30,
      "servings": 2
    },
    [
      {
        "id": 1,
        "user_id": 1,
        "name": "salt"
      },
      {
        "id": 2,
        "user_id": 1,
        "name": "vegetable oil"
      },
      {
        "id": 3,
        "user_id": 1,
        "name": "pepper"
      },
    ]
  ];


  // const { id } = useParams();

  // get data to update state;
  useEffect(() => {
    // axios.get(`http://localhost:8080/api/users/${id}`
    // ).then((res) => {
    //   // console.log("res", res.data);
    setUser(prev => ({
      ...prev,
      id: userInfo[0].id,
      firstName: userInfo[0].first_name,
      lastName: userInfo[0].last_name,
      email: userInfo[0].email,
      imgUrl: userInfo[0].img_url,
      maxCalories: userInfo[0].max_calories,
      maxTime: userInfo[0].max_time,
      servings: userInfo[0].servings
    }));
    setPantryItems(userInfo[1]);
  }, []);


  console.log('user', user);
  console.log('pantry', pantryItems);


  return (
    <div>
      Profile
    </div>
  );
}
