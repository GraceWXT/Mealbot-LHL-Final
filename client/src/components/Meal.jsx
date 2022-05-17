import {
  Box,
  Text,
  Td,
  Image,
  VStack,
} from "@chakra-ui/react";

export default function Meal(props) {
  const { recipe, handleDelete } = props;

  return (
    <Td padding="5px">
      <VStack width="16vh"
      >
        <Image
          src={recipe.value.image}
          boxSize="16vh"
          borderRadius='lg'
        />
        <Text
          height="4em"
          width="16vh"
          fontSize="smaller"
          textAlign="center"
        >{recipe.value.title}</Text>
      </VStack>
    </Td>
  );
}
