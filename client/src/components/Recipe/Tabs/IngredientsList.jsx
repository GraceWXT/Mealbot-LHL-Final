import { ListItem, UnorderedList} from "@chakra-ui/react";

export default function IngredientsList(props) {
  const { servingsMultiplier, ingredients } = props;
  const ingredientList = ingredients.map((ingredient, index) => {

    const ingredientAmount = Number.isInteger(ingredient.amount * servingsMultiplier) ?
      (ingredient.amount * servingsMultiplier)
      : (ingredient.amount * servingsMultiplier).toFixed(1);

    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        {`${ingredientAmount} ${ingredient.unit} ${ingredient.name}`}
      </ListItem>
    );
  });

  return (
    <UnorderedList
      h="100%"
      listStylePosition="inside"
      marginInlineStart={0}
      overflowY="auto"
    >
      {ingredientList}
    </UnorderedList>
  );
}
