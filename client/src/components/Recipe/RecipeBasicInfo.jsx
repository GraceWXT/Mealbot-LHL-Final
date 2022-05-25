import {
  VStack, HStack,
  Heading, Text, IconButton, Image,
  useColorModeValue
} from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
export default function RecipeBasicInfo(props) {
  const { recipe, setServings } = props;

  //SERVING CALCULATOR
  const addServing = () => {
    setServings(prev => prev + 1);
  };

  const minusServing = () => {
    if (recipe.defaultServing > 1) {
      setServings(prev => prev - 1);
    }
  };

  return (
    <VStack alignItems="start" spacing={5}>
      <Heading width="32rem" as="h2">{recipe.title}</Heading>
      <HStack width="32rem" spacing={10}>
        <Text>Cooking time: {recipe.readyInMinutes} minutes</Text>
        <HStack>
          <IconButton
            onClick={minusServing}
            borderRadius="50%"
            size="xs"
            colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
            icon={<FaMinus />}
            aria-label="minus serving by one"
          />
          <Text>{recipe.defaultServing} servings</Text>
          <IconButton
            onClick={addServing}
            borderRadius="50%"
            size="xs"
            colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
            icon={<FaPlus />}
            aria-label="add serving by one"
          />
        </HStack>
      </HStack>
      <Image src={recipe.image} rounded="md" />
    </VStack>
  );
}
