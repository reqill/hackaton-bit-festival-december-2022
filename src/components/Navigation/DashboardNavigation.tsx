import { Box, Circle, Divider, Heading, Icon, LinkBox, useBoolean, VStack } from '@chakra-ui/react';
import {
  DASHBOARD_ROUTE,
  DASHBOARD_ROUTES,
  DEFAULT_TRANSITION,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from 'src/constants';
import { DashboardLinkItem } from './DashbordLinkItem';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const DashboardNavigation = () => {
  const [collapsed, setCollapsed] = useBoolean(false);
  const WIDTH = collapsed ? 75 : 220;

  return (
    <Box height="100vh" position="relative" width={WIDTH} transition={DEFAULT_TRANSITION}>
      <Circle
        position="absolute"
        backgroundColor="gray.800"
        border="1px solid"
        borderColor="gray.700"
        right={-0.5}
        top={9}
        onClick={setCollapsed.toggle}
      >
        <Icon color="whiteAlpha.800" height={4} width={4} m={0.5}>
          {!collapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Icon>
      </Circle>
      <VStack
        spacing={1}
        alignItems="left"
        height="calc(100% - 14px)"
        m="7px"
        borderRadius={10}
        pl={3}
        pr={4}
        backgroundColor="gray.800"
        justifyContent="space-between"
      >
        <VStack spacing={1} alignItems="left">
          <LinkBox pointerEvents={collapsed ? 'none' : 'all'} position="relative">
            <Link href={'/'}>
              <Heading
                fontWeight="semibold"
                color="whiteAlpha.900"
                mt={5}
                px={3}
                mb={3}
                whiteSpace="nowrap"
                opacity={collapsed ? 0 : 1}
                ml={collapsed ? -1 : 0}
                transition={DEFAULT_TRANSITION}
              >
                Plaatrr
              </Heading>
              <Heading
                fontWeight="semibold"
                color="whiteAlpha.900"
                mt={5}
                px={3}
                mb={3}
                whiteSpace="nowrap"
                opacity={collapsed ? 1 : 0}
                transition={DEFAULT_TRANSITION}
                position="absolute"
                left={collapsed ? -1 : 0}
                top={0}
              >
                P
              </Heading>
            </Link>
          </LinkBox>
          <Divider width={collapsed ? '65%' : '91%'} pr={4} opacity={0.2} />
          <Divider width="90%" pr={4} opacity={0} />
          <Divider width="90%" pr={4} opacity={0} />
          <DashboardLinkItem {...DASHBOARD_ROUTE} isCollapsed={collapsed} />
          {DASHBOARD_ROUTES.map((route, i) => (
            <DashboardLinkItem {...route} isCollapsed={collapsed} key={`key-dash-2-${i}`} />
          ))}
        </VStack>

        <VStack spacing={1} alignItems="left" pb={3}>
          <Divider width={collapsed ? '65%' : '91%'} pr={4} opacity={0.2} />
          <Divider width="90%" pr={4} opacity={0} />
          <DashboardLinkItem {...SETTINGS_ROUTE} isCollapsed={collapsed} />
          <DashboardLinkItem {...PROFILE_ROUTE} isCollapsed={collapsed} />
          <DashboardLinkItem
            pageName="Log out"
            relativePath="/api/auth/logout"
            isCollapsed={collapsed}
          />
        </VStack>
      </VStack>
    </Box>
  );
};
