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
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";

export default function Meal(props) {
  const { recipe, handleDelete } = props;

  const toggleOptions = () => {

  };
  return (
    <Td padding="8px 0px" verticalAlign="top" >
      <Popover trigger="hover" gutter={3}>
        <PopoverTrigger>
          <VStack>
            <Image
              src={recipe.value.image}
              width="auto"
              height="12vh"
              borderRadius='lg'
            />
            <Text
              width="16vh"
              fontSize="xs"
              textAlign="center"
            >{recipe.value.title}</Text>
          </VStack>
        </PopoverTrigger>
        <PopoverContent width="16vh" >
          <PopoverArrow />
          <PopoverBody>
            <HStack justifyContent="center">
              <IconButton
                aria-label='delete meal'
                icon={<DeleteIcon />}
                colorScheme="majestyPurple"
                borderRadius="50%"
                size="xs"
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
