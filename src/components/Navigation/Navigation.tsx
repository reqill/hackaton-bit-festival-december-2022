import { HStack } from '@chakra-ui/react';
import { NAV_ROUTES } from 'src/constants';
import { NavigationItem } from './NavigationItem';
import { NavLogo } from './NavLogo';

export const Navigation = () => {
  return (
    <HStack w="100%" justifyContent="space-between" pl={5} py={2} pr={3}>
      <NavLogo />
      <HStack wrap="nowrap" flexWrap="nowrap">
        {NAV_ROUTES.map((path, i) => (
          <NavigationItem {...path} key={`nav-item-${i}`} />
        ))}
      </HStack>
    </HStack>
  );
};
