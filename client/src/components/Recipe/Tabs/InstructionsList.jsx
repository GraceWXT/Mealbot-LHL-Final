// External components and hooks
import { HStack, Text, ListItem, List} from "@chakra-ui/react";

export default function InstructionsList(props) {
  const { instructions } = props;
  //maps over instructionsArray to return a list of instructions
  const instructionsList = instructions.map((instruction, index) => {
    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        <HStack spacing={5}>
          <Text fontWeight="500">{instruction.number}</Text>
          <Text>{instruction.step}</Text>
        </HStack>
      </ListItem>
    );
  });

  return (
    <List h="100%" overflow="auto">
      {instructionsList}
    </List>

  );
}
