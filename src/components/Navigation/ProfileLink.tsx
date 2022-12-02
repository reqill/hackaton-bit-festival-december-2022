import { Icon } from '@chakra-ui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

export const ProfileLink: FC = () => {
  return (
    <Icon aria-label="settings" background="transparent" width={7} height={7} my={1} mx={2.5}>
      <UserCircleIcon height="100%" width="100%" strokeWidth={1.25} />
    </Icon>
  );
};
