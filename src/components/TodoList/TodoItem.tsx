import { Badge, Box, HStack, Icon, Text, useBoolean, VStack } from '@chakra-ui/react';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/outline';
import { Dialog } from '../Dialog';

type TodoItemProps = {
  title: string;
};

export const TodoItem = ({ title }: TodoItemProps) => {
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
            {title}
          </Text>
          <HStack pt=".35rem" justifyContent="space-between">
            <HStack>
              <Badge backgroundColor="red.100">label1</Badge>
              <Badge backgroundColor="yellow.100">lorem</Badge>
              <Badge backgroundColor="green.100">UI</Badge>
            </HStack>
            <Icon color="orangered">
              <ChevronDoubleUpIcon strokeWidth={2} />
            </Icon>
          </HStack>
        </VStack>
      </Box>
      <Dialog onClose={() => setIsCollapsed.off()} open={isCollapsed} title={title}>
        <>some info about this item</>
      </Dialog>
    </>
  );
};
