import { Badge, Box, HStack, Icon, Text, useBoolean, VStack } from '@chakra-ui/react';
import {
  ChevronDoubleUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MinusSmallIcon,
} from '@heroicons/react/24/outline';
import { Importance } from '@prisma/client';
import { Dialog } from '../Dialog';
import { FrontTaskType } from './TodoList';

const getPriorityBadgeWithColor = (importance: Importance) => {
  switch (importance) {
    case Importance.LOW:
      return (
        <Icon color="blue">
          <ChevronDownIcon strokeWidth={2} />
        </Icon>
      );
    case Importance.MEDIUM:
      return (
        <Icon color="yellow">
          <MinusSmallIcon strokeWidth={2} />
        </Icon>
      );
    case Importance.HIGH:
      return (
        <Icon color="orangered">
          <ChevronUpIcon strokeWidth={2} />
        </Icon>
      );
    case Importance.CRITICAL:
      return (
        <Icon color="red">
          <ChevronDoubleUpIcon strokeWidth={2} />
        </Icon>
      );
    default:
      return (
        <Icon color="yellow">
          <ChevronDoubleUpIcon strokeWidth={2} />
        </Icon>
      );
  }
};

export const TodoItem = ({ importance, name, groupName, taskType }: FrontTaskType) => {
  const [isCollapsed, setIsCollapsed] = useBoolean(false);

  return (
    <>
      <Box
        backgroundColor="white"
        width="100%"
        height={16}
        borderRadius={5}
        onClick={() => setIsCollapsed.on()}
      >
        <VStack width="100%" alignItems="left" pt={2} px={3} spacing={0}>
          <Text fontWeight="medium" fontSize={16} noOfLines={1}>
            {name}
          </Text>
          <HStack pt=".35rem" justifyContent="space-between">
            <HStack>
              {groupName && <Badge>{groupName}</Badge>}
              {taskType && <Badge>{taskType}</Badge>}
            </HStack>
            {getPriorityBadgeWithColor(importance)}
          </HStack>
        </VStack>
      </Box>
      <Dialog onClose={() => setIsCollapsed.off()} open={isCollapsed} title={name}>
        <Text>
          Priority: <b>{importance}</b>
        </Text>
        <Text>
          Group: <b>{groupName || 'N/A'}</b>
        </Text>
        <Text>
          Category: <b>{taskType || 'N/A'}</b>
        </Text>
      </Dialog>
    </>
  );
};
