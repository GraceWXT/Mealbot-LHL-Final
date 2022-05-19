// External components and hooks
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";

// Internal components
import Meal from "./Meal";

// Helper Functions
import { mealPlanSorter, headerTextHelper } from "helpers/mealplan-helper";


export default function MealPlanTable(props) {
  const { mealPlan } = props;
  // Restructure the mealPlan state into array of 3 arrays
  const breakfasts = mealPlanSorter(mealPlan, 1) || [];
  const lunches = mealPlanSorter(mealPlan, 2) || [];
  const dinner = mealPlanSorter(mealPlan, 3) || [];

  const array = [breakfasts, lunches, dinner];

  // Map the restructured meal plan array to render each table row
  const rows = array.map((row, index) => {
    //Create the row header based on the index
    const headerText = headerTextHelper(index + 1);

    let tds = [];
    if (!row.length) {
      // When the row is empty, push 7 empty Tds to the row
      for (let i = 0; i <= 6; i++) {
        tds.push(<Td key={`${index}-${i}`} py="8px" height="20vh"></Td>);
      }

    } else {
      // When the row is not empty
      // Check if there is a recipe value for each meal and render the meal or an empty Td
      for (let i = 0; i < row.length; i++) {
        row[i].value ?
          tds.push(<Meal key={row[i].value.id} meal={row[i]} />) :
          tds.push(<Td key={`${index}-${i}`} py="8px" height="20vh"></Td>);
      }
    }

    // Return the table row with a header and 7 Tds
    return (
      <Tr key={index}>
        <Th  width="7vw">{headerText}</Th>
        {tds}
      </Tr>
    );
  });

  return (
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
  );
}
