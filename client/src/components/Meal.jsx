import {
  IconButton,
  Text,
  Td,
  Image,
  VStack,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Meal(props) {
  const { setMealPlan } = useOutletContext();
  const { meal } = props;

  const deleteMealByDateSlot = () => {
    setMealPlan(prev => {
      // console.log(mealPlan.map(prevMeal => {
      //   return (prevMeal.date === meal.date && prevMeal.slot === meal.slot ?
      //     {...prevMeal, value:null} : prevMeal);
      // }));
      return prev.map(prevMeal => {
        return (prevMeal.date === meal.date && prevMeal.slot === meal.slot ?
          {...prevMeal, value:null} : prevMeal);
      });
    });
  };

  return (
    <Td padding="8px 0px" verticalAlign="top" height="20vh">
      <Popover trigger="hover" gutter={3}>
        <PopoverTrigger>
          <VStack>
            <Link to={`/recipes/${meal.value.id}`} >
              <Image
                src={meal.value.image}
                width="auto"
                height="12vh"
                borderRadius='lg'
              />
            </Link>
            <Text
              width="16vh"
              fontSize="xs"
              textAlign="center"
            >{meal.value.title}</Text>
          </VStack>
        </PopoverTrigger>
        <PopoverContent width="16vh" bg="gray.100" >
          <PopoverArrow bg="gray.100" />
          <PopoverBody>
            <HStack justifyContent="center">
              <IconButton
                aria-label='delete meal'
                icon={<DeleteIcon />}
                colorScheme="majestyPurple"
                borderRadius="50%"
                size="xs"
                onClick={() => deleteMealByDateSlot()}
              />
              <IconButton
                aria-label='delete meal'
                icon={<RepeatIcon />}
                colorScheme="turquoiseGreen"
                borderRadius="50%"
                size="xs"
              />
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Td>
  );
}
