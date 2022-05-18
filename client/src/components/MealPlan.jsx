// External components and hooks
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
  VStack
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import { useOutletContext } from "react-router-dom";
// Internal components
import Meal from "./Meal";
// Helper Functions
import { mealPlanSorter, headerTextHelper } from "helpers/mealplan-helper";
import { getNextMondaySec, getEndDate } from "helpers/date-helper";

export default function MealPlan() {
  const { mealPlan, setMealPlan } = useOutletContext();

  // Create the date strings for meal plan heading
  const nextMondayTimestamp = getNextMondaySec();
  const nextMondayDate = new Date(nextMondayTimestamp * 1000).toISOString().split("T")[0];
  const nextSundayDate = getEndDate(nextMondayTimestamp);

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
          tds.push(<Meal key={row[i].value.id} meal={row[i]} setMealPlan={setMealPlan} />) :
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
    <VStack>
      {/* Heading with left & right button and the meal plan start & end date */}
      <HStack marginTop="3vh" marginBottom="2vh">
        <IconButton
          aria-label='previous week'
          icon={<ChevronLeftIcon />}
          borderRadius="50%"
        />
        <Heading fontSize="1.5rem">
          {`${nextMondayDate} - ${nextSundayDate}`}
        </Heading>
        <IconButton
          aria-label='next week'
          icon={<ChevronRightIcon />}
          borderRadius="50%"
        />
      </HStack>
      {/* Table with a Thead of 7 days (7 columns) in a week, and 3 rows */}
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
