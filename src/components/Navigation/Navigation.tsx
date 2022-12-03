import { HStack, Show } from '@chakra-ui/react';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';
import { NavLogo } from './NavLogo';

export const Navigation = () => {
  return (
    <HStack w="100%" justifyContent="space-between" pl={[3, 5]} py={[1, 2]} pr={[1.5, 3]}>
      <NavLogo />
      <Show above="md">
        <DesktopNavigation />
      </Show>
      <Show below="md">
        <MobileNavigation />
      </Show>
    </HStack>
  );
};
