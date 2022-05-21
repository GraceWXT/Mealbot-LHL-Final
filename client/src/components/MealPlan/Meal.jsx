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
import axios from "axios";

export default function Meal(props) {
  const { mealPlan, setMealPlan, mealPlanStatus } = useOutletContext();
  const { meal } = props;

  const FutureSaved = "FutureSaved";
  const PastSaved = "PastSaved";

  const EnablePopover =
    mealPlanStatus === FutureSaved || mealPlanStatus === PastSaved ?
      false : undefined;

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

  const shuffleMealById = () => {
    axios.post(`http://localhost:8080/api/mealplans/shuffle/${meal.value.id}`, mealPlan)
      .then(res => {
        setMealPlan(res.data);
      })
      .catch(err => {
        console.log("axios.get shuffle meal by id error: ", err.message);
      });
  };

  return (
    <Td py="0.8%" verticalAlign="top" height="20vh">
      <Popover
        trigger="hover"
        gutter={3}
        isOpen={ EnablePopover }
      >
        <PopoverTrigger >
          <VStack
            boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 10px 0px"
            w="fit-content" h="100%"
            borderRadius="lg"
          >
            <Link to={`/recipes/${meal.value.id}`} >
              <Image
                src={meal.value.image}
                width="auto"
                height="12vh"
                borderTopRadius='lg'
              />
            </Link>
            <Text
              width="16vh"
              fontSize="sm"
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
                aria-label='shuffle meal recipe'
                icon={<RepeatIcon />}
                colorScheme="turquoiseGreen"
                borderRadius="50%"
                size="xs"
                onClick={() => shuffleMealById()}
              />
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Td>
  );
}
