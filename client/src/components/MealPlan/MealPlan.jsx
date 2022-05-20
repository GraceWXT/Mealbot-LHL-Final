import { useState, useEffect } from "react";
// External components and hooks
import {
  IconButton,
  Heading,
  HStack,
  VStack,
  Button,
  useColorModeValue,
  useToast,
  Tooltip
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

// Helper Functions
import { getFormatedDates, getPreviousMonday, getNextMonday } from "../../helpers/date-helper";

import MealPlanTable from "./MealPlanTable";

export default function MealPlan() {
  const { startDate, setStartDate, mealPlan, mealPlanStatus, setMealPlanStatus } = useOutletContext();
  const navigate = useNavigate();

  const FutureNew = "FutureNew";
  const FutureSaved = "FutureSaved";
  const PastSaved = "PastSaved";

  let disableGroceryButton = true;
  let disableActionButton = true;
  let actionButtonText = "Save";
  if (mealPlanStatus === FutureNew) {
    disableGroceryButton = true;
    disableActionButton = false;
    actionButtonText = "Save";
  } else if (mealPlanStatus === FutureSaved) {
    disableGroceryButton = false;
    disableActionButton = false;
    actionButtonText = "Edit";
  } else if (mealPlanStatus === PastSaved) {
    disableGroceryButton = false;
    disableActionButton = true;
    actionButtonText = "Edit";
  } else {
    console.log("mealPlanStatus in MealPlan", mealPlanStatus, typeof mealPlanStatus);
  }


  // Create the date strings for meal plan heading
  const { monday, sunday } = getFormatedDates(startDate);

  const showPreviousWeek = () => {
    const previousMonday = getPreviousMonday(startDate);
    setStartDate(previousMonday);
    navigate(`/mealplan/${previousMonday}`);
  };

  const showNextWeek = () => {
    const nextMonday = getNextMonday(startDate);
    setStartDate(nextMonday);
    navigate(`/mealplan/${nextMonday}`);
  };


  const toast = useToast();
  const saveMealPlan = () => {
    axios.post(`http://localhost:8080/api/mealplans/${startDate}`, mealPlan).then(res => {
      const result = res.data;
      console.log("save result", result);
      if (result.status === "success") {
        toast({
          title: "Meal Plan Saved!",
          description: "The grocery list is now available.",
          status: "success",
          containerStyle: {
            backgroundColor:"turquoiseGreen"
          },
          variant: "subtle",
          duration: 5000,
          isClosable: true,
        });
        setMealPlanStatus("FutureSaved");
      } else {
        toast({
          title: "Sorry, an error occured.",
          description: "Please try saving it again later.",
          status: "error",
          variant: "subtle",
          duration: 5000,
          isClosable: true,
        });
      }
    }).catch(err => {
      console.log("Error: ", err.message);
    });
  };


  return (
    <VStack height="92vh">
      <VStack spacing="2vh">
        {/* Heading with left & right button and the meal plan start & end date */}
        <HStack marginTop="3vh">
          <IconButton
            aria-label='previous week'
            icon={<ChevronLeftIcon />}
            borderRadius="50%"
            bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
            onClick={() => showPreviousWeek()}
          />
          <Heading fontSize="1.5rem" px="3vw">
            {`${monday} - ${sunday}`}
          </Heading>
          <IconButton
            aria-label='next week'
            icon={<ChevronRightIcon />}
            borderRadius="50%"
            bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
            onClick={() => showNextWeek()}
          />
        </HStack>
        <MealPlanTable mealPlan={mealPlan}/>
        <HStack alignSelf="flex-end">
          <Tooltip label="Please save your meal plan first">
            <Link to={`/grocerylist/${startDate}`}>
              <Button
                disabled={ disableGroceryButton }
                colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              >
                Get the grocery list
              </Button>
            </Link>
          </Tooltip>
          <Button
            colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
            onClick={() => saveMealPlan()}
            disabled={ disableActionButton }
          >
            { actionButtonText }
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
