import { Box, HStack, Icon, Text, useBoolean, VStack } from '@chakra-ui/react';
import Scrollbars from 'react-custom-scrollbars-2';
import { TodoItem } from './TodoItem';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { TodoItemAdd } from './TodoItemAdd';
import { Task } from '@prisma/client';

export type FrontTaskType = Task & { groupName?: string; taskType?: string };

export const TodoList = ({
  data,
  title,
  createNew,
}: {
  data?: FrontTaskType[];
  title: string;
  createNew: () => void;
}) => {
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

          {data?.map((task: FrontTaskType) => (
            <TodoItem key={`todo-item-${task.id}`} {...task} />
          ))}
          <TodoItemAdd addNew={createNew} />
        </VStack>
      </Scrollbars>
    </Box>
  );
};
