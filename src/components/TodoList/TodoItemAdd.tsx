import { Box, Center, Text } from '@chakra-ui/react';
import { DEFAULT_TRANSITION } from 'src/constants';

type TodoItemAddProps = {
  addNew: () => void;
};

export const TodoItemAdd = ({ addNew }: TodoItemAddProps) => {
  return (
    <Box
      width="100%"
      onClick={addNew}
      height={16}
      borderRadius={5}
      cursor="pointer"
      borderStyle="dashed"
      borderWidth="2px"
      borderColor="gray.300"
      transition={DEFAULT_TRANSITION}
      _hover={{ borderColor: 'gray.400', backgroundColor: 'gray.200' }}
    >
      <Center height="100%">
        <Text
          fontWeight="semibold"
          transition={DEFAULT_TRANSITION}
          color="gray.500"
          _hover={{ color: 'gray.600' }}
        >
          Add a new item
        </Text>
      </Center>
    </Box>
  );
};
