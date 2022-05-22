import { Td } from "@chakra-ui/react";
import { useOutletContext } from "react-router";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./DndConstants";

import RecipeCard from "./RecipeCard";

export default function Meal(props) {
  const { meal, draggingMeal, setDraggingMeal } = props;
  const { setMealPlan } = useOutletContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.RECIPE,
    drop: () => {
      setMealPlan(prev => {
        return prev.map(prevMeal => {
          if (prevMeal.date === meal.date && prevMeal.slot === meal.slot)
            return {...prevMeal, value: draggingMeal.value};
          if (prevMeal.date === draggingMeal.date && prevMeal.slot === draggingMeal.slot)
            return {...prevMeal, value: meal.value};
          return prevMeal;
        });
      });
    }, // setMealPlan to new state - excahnge meal.value
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [meal, draggingMeal]);

  return (
    <Td
      ref={drop}
      py="0.8%"
      verticalAlign="top"
      height="22vh"
      bg={ isOver ? "gray.100" : undefined}
    >
      {meal.value && <RecipeCard meal={meal} setDraggingMeal={setDraggingMeal}/>}
    </Td>
  );
}
