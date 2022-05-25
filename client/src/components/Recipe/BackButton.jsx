import { Button, useColorModeValue } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useOutletContext, Link } from "react-router-dom";

export default function BackButton() {
  const { startDate } = useOutletContext();
  return (
    <Link to={`/mealplan/${startDate}`} >
      <Button
        bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
        leftIcon={<ArrowBackIcon />}
        _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
        _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
        aria-label="go back to meal plan"
      >
        Back
      </Button>
    </Link>
  );
}
