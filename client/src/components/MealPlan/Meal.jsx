import {
  Td,
} from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";

export default function Meal(props) {
  const { meal } = props;


  return (
    <Td py="0.8%" verticalAlign="top" height="20vh">
      <RecipeCard meal={meal}/>
    </Td>
  );
}
