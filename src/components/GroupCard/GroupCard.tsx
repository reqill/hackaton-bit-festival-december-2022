import { Box, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { DEFAULT_TRANSITION } from 'src/constants';
import { Avatar } from '../Avatar';

type GroupCardProps = {
  name: string;
  users: {
    name: string;
  }[];
  addPerson: (groupName: string) => void;
};

export const generateAvatars = (users: { name: string }[]) => {
  const first5Users = users.slice(0, 5);
  const numberOfRestUsers = users.length - 5 > 0 ? users.length - 5 : 0;

  return (
    <>
      {first5Users.map((user, i) => (
        <Avatar name={user.name} key={i} />
      ))}
      {numberOfRestUsers > 0 && <Avatar name={`+${numberOfRestUsers}`} moreChars />}
    </>
  );
};

export const GroupCard = ({ name, users, addPerson }: GroupCardProps) => {
  return (
    <Box
      backgroundColor="white"
      width="100%"
      height={120}
      borderRadius={10}
      px={5}
      pb={4}
      pt={5}
      boxShadow="0 5px 10px 0 rgba(0, 0, 0, 0.03)"
    >
      <VStack width="100%" alignItems="left">
        <HStack justifyContent="space-between">
          <Heading fontWeight="semibold" fontSize="2xl" noOfLines={1}>
            {name}
          </Heading>
          <Box
            onClick={() => addPerson(name)}
            userSelect="none"
            cursor="pointer"
            transition={DEFAULT_TRANSITION}
            borderRadius={5}
            _hover={{
              backgroundColor: 'gray.100',
            }}
            width={7}
            height={7}
          >
            <Icon width={6} height={6} pl={1} pt={1}>
              <PlusIcon />
            </Icon>
          </Box>
        </HStack>
        <HStack spacing="-.9rem" pt={2}>
          {users ? generateAvatars(users) : <Text>No users in this group</Text>}
        </HStack>
      </VStack>
    </Box>
  );
};
