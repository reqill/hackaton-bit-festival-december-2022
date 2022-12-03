import { HStack } from '@chakra-ui/react';
import { NAV_ROUTES } from 'src/constants';
import { NavigationItem } from './NavigationItem';

export const DesktopNavigation = () => {
  return (
    <HStack wrap="nowrap" flexWrap="nowrap">
      {NAV_ROUTES.map((path, i) => (
        <NavigationItem {...path} key={`nav-item-${i}`} />
      ))}
    </HStack>
  );
};
