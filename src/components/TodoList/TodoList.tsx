import { Box, HStack, Icon, Text, useBoolean, VStack } from '@chakra-ui/react';
import Scrollbars from 'react-custom-scrollbars-2';
import { TodoItem } from './TodoItem';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { TodoItemAdd } from './TodoItemAdd';

const test = [
  { title: 'Lorem Ipsum' },
  { title: 'Something' },
  { title: 'LOL' },
  { title: 'VERY LONG MY GOD' },
  { title: 'title5' },
  { title: 'title6' },
  { title: 'title7' },
  { title: 'title8' },
  { title: 'How the kek is that even longer twf' },
  { title: 'title10' },
  { title: 'title11' },
  { title: 'title12' },
  { title: 'title13' },
  { title: 'title14' },
  { title: 'title15' },
];

export const TodoList = ({ title, createNew }: { title: string; createNew: () => void }) => {
  const [isCollapsed, setIsCollapsed] = useBoolean(false);

  return (
    <Box
      backgroundColor="gray.100"
      borderRadius={5}
      p={2}
      position="relative"
      h={isCollapsed ? 'calc(100vh - 38.1rem)' : '100%'}
    >
      <Scrollbars
        autoHeight
        autoHeightMin={isCollapsed ? 'calc(100vh - 38.7rem)' : 'calc(100vh - 10.5rem)'}
        autoHeightMax={isCollapsed ? 'calc(100vh - 38.7rem)' : 'calc(100vh - 10.5rem)'}
        autoHide
        autoHideTimeout={200}
      >
        <VStack spacing=".4rem">
          <HStack
            position="sticky"
            top={0}
            backgroundColor="gray.100"
            width="100%"
            justifyContent="space-between"
            pb={1}
            textAlign="left"
            px={2}
          >
            <Text
              fontWeight="medium"
              fontSize={14}
              color="blackAlpha.900"
              textTransform="uppercase"
            >
              {title}
            </Text>
            {
              <Icon onClick={setIsCollapsed.toggle}>
                {isCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </Icon>
            }
          </HStack>

          {test.map((item, i) => (
            <TodoItem key={`todo-item-${i}`} {...item} />
          ))}
          <TodoItemAdd addNew={createNew} />
        </VStack>
      </Scrollbars>
    </Box>
  );
};
