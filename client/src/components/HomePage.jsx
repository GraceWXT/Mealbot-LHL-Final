import {
  Button
} from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";

export default function HomePage() {
  const { startDate } = useOutletContext();

  return (
    <div>
      HomePage
      <Link to={`mealplan/${startDate}`}>
        <Button>
          I'm feeling Hungry!
        </Button>
      </Link>
    </div>
  );
}
