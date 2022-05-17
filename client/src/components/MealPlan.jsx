import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
  Heading,
  HStack
} from "@chakra-ui/react";

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
          <Th>{headerText}</Th>
          {tds}
        </Tr>
      );
    } else {
      const tds = row.map(meal => {
        return <Meal key={meal.value.id} recipe={meal}/>;
      });
      return (
        <Tr key={index}>
          <Th>{headerText}</Th>
          {tds}
        </Tr>
      );
    }
  });


  return (
    <>
      <HStack>
        <Button>
          left
        </Button>
        <Heading as="span">
          May 16 - May 22
        </Heading>
        <Button>
          right
        </Button>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Mon</Th>
            <Th>Tue</Th>
            <Th>Wed</Th>
            <Th>Thu</Th>
            <Th>Fri</Th>
            <Th>Sat</Th>
            <Th>Sun</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows}
        </Tbody>
      </Table>
    </>
  );
}
