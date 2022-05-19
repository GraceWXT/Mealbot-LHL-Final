import { useState, useEffect } from "react";
// External components and hooks
import {
  IconButton,
  Heading,
  HStack,
  VStack,
  Button,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Helper Functions
import { getFormatedDates, getPreviousMonday, getNextMonday } from "../helpers/date-helper";

import MealPlanTable from "./MealPlanTable";

export default function MealPlan() {
  const { startDate } = useParams();
  const [mealPlan, setMealPlan ] = useState([]);
  const navigate = useNavigate();

  // based on the startDate
  // send an axios request to get back end to get either an existing plan or a random new plan
  useEffect(() => {
    axios.get(`http://localhost:8080/api/mealplans/${startDate}`).then(res => {
      const mealPlan = res.data;
      setMealPlan(mealPlan);
    }).catch(err => {
      console.log("Error: ", err.message);
    });
  }, [startDate]);

  // set meal plan data and status based on the response

  // Create the date strings for meal plan heading
  const { monday, sunday } = getFormatedDates(startDate);

  const showPreviousWeek = () => {
    const previousMonday = getPreviousMonday(startDate);
    navigate(`/mealplan/${previousMonday}`);
  };

  const showNextWeek = () => {
    const nextMonday = getNextMonday(startDate);
    navigate(`/mealplan/${nextMonday}`);
  };


  let groceryButtonHidden = true;
  let buttonText = "Save";
  const toast = useToast();
  const saveMealPlan = () => {
    axios.post(`http://localhost:8080/api/mealplans/${startDate}`, mealPlan).then(res => {
      const result = res.data;
      console.log("save result", result);
      if (result.status === "success") {
        toast({
          title: "Meal Plan Saved Successfully!",
          description: "Click on the grocery list button to see the groce",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        buttonText = "Edit";
        groceryButtonHidden = false;
      }
    }).catch(err => {
      console.log("Error: ", err.message);
    });
  };


  return (
    <VStack height="92vh">
      <VStack>
        {/* Heading with left & right button and the meal plan start & end date */}
        <HStack marginTop="3vh" marginBottom="2vh">
          <IconButton
            aria-label='previous week'
            icon={<ChevronLeftIcon />}
            borderRadius="50%"
            bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
            onClick={() => showPreviousWeek()}
          />
          <Heading fontSize="1.5rem">
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
          <Link to={`grocerylist/${startDate}`}>
            <Button
              hidden={groceryButtonHidden}
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              onClick={() => saveMealPlan()}
            >
              Checkout the grocery list
            </Button>
          </Link>
          <Button
            colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
            onClick={() => saveMealPlan()}
          >
            {buttonText}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
