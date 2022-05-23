import { useOutletContext } from "react-router-dom";

//chakra-ui & icon imports
import {
  HStack, Container, Wrap,
  Heading,
  useColorModeValue,
  IconButton, List, ListItem, ListIcon,
  CheckboxGroup, Checkbox, ButtonGroup,
  EditablePreview, Input, useEditableControls, Editable, Tooltip, EditableInput,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";
import { IoFastFoodOutline, IoHeartDislikeOutline, IoEarthSharp } from "react-icons/io5";
import { MdOutlineFoodBank, MdTimer } from "react-icons/md";


export default function Preferences() {
  const { user } = useOutletContext();

  const EditableControls = () => {

    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) :
      <IconButton
        size="sm"
        bg="transparent"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />;
  };

  return (
    <Container
      boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 12px 2px"
      bg={useColorModeValue("white", "blackAlpha.900")}
      w="30vw"
      height="100%"
      rounded="lg"
      padding="2rem"
    >
      <Heading as="h2" size="md">Preferences</Heading>
      <List height="full" overflow="auto" alignItems="flex-start" py={2}>
        <ListItem py={2} borderBottom="1px" borderColor="gray.200">
          <ListIcon as={IoFastFoodOutline} />
            Max Calories (per meal):
          <Editable
            defaultValue={user.max_calories}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
          >
            <HStack justifyContent="space-between">
              <Tooltip label="Click to edit">
                <EditablePreview
                  py={2}
                  px={4}
                  _hover={{
                    background: useColorModeValue("gray.100", "gray.700")
                  }}
                />
              </Tooltip>
              <Input py={2} px={4} as={EditableInput} w="100%" />
              <EditableControls />
            </HStack>
          </Editable>
        </ListItem>
        <ListItem py={2} borderBottom="1px" borderColor="gray.200">
          <ListIcon as={MdTimer}  />
          Max Cooking Time (mins):
          <Editable
            defaultValue={user.max_time}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
          >
            <HStack justifyContent="space-between">
              <Tooltip label="Click to edit">
                <EditablePreview
                  py={2}
                  px={4}
                  _hover={{
                    background: useColorModeValue("gray.100", "gray.700")
                  }}
                />
              </Tooltip>
              <Input py={2} px={4} as={EditableInput} w="100%" />
              <EditableControls />
            </HStack>
          </Editable>
        </ListItem>
        <ListItem py={2} borderBottom="1px" borderColor="gray.200">
          <ListIcon as={MdOutlineFoodBank}  />
          Household Size:
          <Editable
            defaultValue={user.servings}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
          >
            <HStack justifyContent="space-between">
              <Tooltip label="Click to edit">
                <EditablePreview
                  py={2}
                  px={4}
                  _hover={{
                    background: useColorModeValue("gray.100", "gray.700")
                  }}
                />
              </Tooltip>
              <Input py={2} px={4} as={EditableInput} w="100%" />
              <EditableControls />
            </HStack>
          </Editable>
        </ListItem>
        <ListItem py={2} borderBottom="1px" borderColor="gray.200">
          <ListIcon as={IoHeartDislikeOutline}  />
          Avoid:
          <Editable
            defaultValue={"Olives, Bittermelon"}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
          >
            <HStack justifyContent="space-between">
              <Tooltip label="Click to edit">
                <EditablePreview
                  py={2}
                  px={4}
                  _hover={{
                    background: useColorModeValue("gray.100", "gray.700")
                  }}
                />
              </Tooltip>
              <Input py={2} px={4} as={EditableInput} w="100%" />
              <EditableControls />
            </HStack>
          </Editable>
        </ListItem>
        <ListItem py={2} borderBottom="1px" borderColor="gray.200">
          <ListIcon as={IoEarthSharp}  />
          Favourite Cuisines:
          <CheckboxGroup
            colorScheme="turquoiseGreen"
            defaultValue={[
              "African", "American", "Asian", "British",
              "Canadian", "European", "French", "Indian","Italian", "Japanese", "Korean",
              "Mediterranean", "Mexican", "Middle Eastern", "Spanish", "World Cuisine"]}>
            <Wrap py={2} px={3} spacing={[2, 3]} direction={["column", "row"]}>
              <Checkbox value="African">African</Checkbox>
              <Checkbox value="American">American</Checkbox>
              <Checkbox value="British">British</Checkbox>
              <Checkbox value="Asian">Asian</Checkbox>
              <Checkbox value="Canadian">Canadian</Checkbox>
              <Checkbox value="European">European</Checkbox>
              <Checkbox value="French">French</Checkbox>
              <Checkbox value="Indian">Indian</Checkbox>
              <Checkbox value="Italian">Italian</Checkbox>
              <Checkbox value="Japanese">Japanese</Checkbox>
              <Checkbox value="Korean">Korean</Checkbox>
              <Checkbox value="Mediterranean">Mediterranean</Checkbox>
              <Checkbox value="Mexican">Mexican</Checkbox>
              <Checkbox value="Middle Eastern">Middle Eastern</Checkbox>
              <Checkbox value="Spanish">Spanish</Checkbox>
            </Wrap>
          </CheckboxGroup>
        </ListItem>
      </List>
    </Container>
  );
}
