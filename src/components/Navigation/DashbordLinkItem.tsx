import { HStack, Icon, LinkBox, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { NavigationRoute } from 'src/types';
import {
  CalendarIcon,
  UserGroupIcon,
  BellIcon,
  QueueListIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { DEFAULT_TRANSITION } from 'src/constants';

type DashboardLinkItemProps = { isCollapsed: boolean } & Omit<
  NavigationRoute,
  'nestedRoutes' | 'description'
>;

export const DashboardLinkItem = ({
  pageName,
  relativePath,
  isCollapsed,
}: DashboardLinkItemProps) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Calendar':
        return <CalendarIcon />;
      case 'Groups':
        return <UserGroupIcon />;
      case 'Pings':
        return <BellIcon />;
      case 'Board':
        return <QueueListIcon />;
      case 'Profile':
        return <UserCircleIcon />;
      case 'Settings':
        return <Cog6ToothIcon />;
      default:
        null;
    }
  };

  return (
    <LinkBox
      borderRadius={5}
      _hover={{
        backgroundColor: 'gray.700',
      }}
      transition={DEFAULT_TRANSITION}
      width={isCollapsed ? 38 : 195}
    >
      <Link href={relativePath}>
        <HStack
          color="whiteAlpha.900"
          pl={isCollapsed ? '.45rem' : 4}
          py={1.5}
          alignItems="center"
          transition={DEFAULT_TRANSITION}
          justifyContent="left"
        >
          <Icon color="inherit" height={6} width={6}>
            {getIcon(pageName)}
          </Icon>
          <Text
            color="inherit"
            fontSize={17}
            pl={1.5}
            opacity={isCollapsed ? 0 : 1}
            transition={DEFAULT_TRANSITION}
          >
            {pageName}
          </Text>
        </HStack>
      </Link>
    </LinkBox>
  );
};
