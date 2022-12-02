import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Icon } from '@chakra-ui/react';

export const SettingsLink = () => {
  return (
    <Icon aria-label="settings" background="transparent" width={7} height={7} my={1} mx={2.5}>
      <Cog6ToothIcon height="100%" width="100%" strokeWidth={1.25} />
    </Icon>
  );
};
