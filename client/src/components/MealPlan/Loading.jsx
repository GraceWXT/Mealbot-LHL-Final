import { Tr, Th, Td, Spinner} from "@chakra-ui/react";

export default function Loading() {
  return (
    <>
      <Tr height="22vh">
        <Th  width="7vw">Breakfast</Th>
        <Td colSpan={7}></Td>
      </Tr>
      <Tr height="22vh">
        <Th  width="7vw">Lunch</Th>
        <Td textAlign="center" colSpan={7}>
          <Spinner
            label="loading"
            thickness="4px"
            speed="1s"
            emptyColor="gray.200"
            color="turquoiseGreen.500"
            size="xl"
          />
        </Td>
      </Tr>
      <Tr height="22vh">
        <Th  width="7vw">Dinner</Th>
        <Td colSpan={7}></Td>
      </Tr>
    </>
  );
}
