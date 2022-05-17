import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  IconButton,
  Heading,
  HStack,
  VStack,

} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

import headerTextHelper from "helpers/headerTextHealper";
import mealPlanSorter from "helpers/mealplan-helper";
import Meal from "./Meal";

export default function MealPlan() {
  const [mealPlan, setMealPlan] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/mealplans/random").then(res => {
      const mealPlan = res.data;
      setMealPlan(mealPlan);
    }).catch(err => {
      console.log("Error: ", err.message);
    });
  }, []);

  const breakfasts = mealPlanSorter(mealPlan, 1);
  const lunches = mealPlanSorter(mealPlan, 2);
  const dinner = mealPlanSorter(mealPlan, 3);

  const array = [breakfasts, lunches, dinner];
  const rows = array.map((row, index) => {
    const headerText = headerTextHelper(index + 1);
    if (!row.length) {
      let tds = [];
      for (let i = 0; i <= 6; i++) {
        tds.push(<Td key={`${index}-${i}`} padding="5px"></Td>);
      }
      return (
        <Tr key={index}>
          <Th width="8vw">{headerText}</Th>
          {tds}
        </Tr>
      );
    } else {
      const tds = row.map(meal => {
        return (
          <Meal key={meal.value.id} recipe={meal}/>
        );
      });
      return (
        <Tr key={index}>
          <Th  width="8vw">{headerText}</Th>
          {tds}
        </Tr>
      );
    }
  });


  return (
    <VStack>
      <HStack marginTop="3vh" marginBottom="2vh">
        <IconButton
          aria-label='previous week'
          icon={<ChevronLeftIcon />}
          borderRadius="50%"
        />
        <Heading fontSize="1.5rem">
          May 16 - May 22
        </Heading>
        <IconButton
          aria-label='next week'
          icon={<ChevronRightIcon />}
          borderRadius="50%"
        />
      </HStack>
      <Table width="88vw">
        <Thead>
          <Tr>
            <Th></Th>
            <Th textAlign="center">Mon</Th>
            <Th textAlign="center">Tue</Th>
            <Th textAlign="center">Wed</Th>
            <Th textAlign="center">Thu</Th>
            <Th textAlign="center">Fri</Th>
            <Th textAlign="center">Sat</Th>
            <Th textAlign="center">Sun</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows}
        </Tbody>
      </Table>
    </VStack>
  );
}
