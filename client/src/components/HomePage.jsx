import {  Button } from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";
// Helper functions
import { getNextMondayDate } from "helpers/date-helper";

export default function HomePage() {
  const { setStartDate } = useOutletContext();
  //Set Initial start date to next Monday
  const nextMondayDate = getNextMondayDate();

  return (
    <div>
      HomePage
      <Link to={`mealplan/${nextMondayDate}`}>
        <Button onClick={() => setStartDate(nextMondayDate)}>
          I'm feeling Hungry!
        </Button>
      </Link>
    </div>
  );
}
