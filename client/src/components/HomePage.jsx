import {
  Button
} from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";

export default function HomePage() {
  const { nextMondayDate } = useOutletContext();

  return (
    <div>
      HomePage
      <Link to={`mealplan/${nextMondayDate}`}>
        <Button>
          I'm feeling Hungry!
        </Button>
      </Link>
    </div>
  );
}
