import { Box, Circle, Divider, Heading, Icon, LinkBox, useBoolean, VStack } from '@chakra-ui/react';
import { DASHBOARD_ROUTES, DEFAULT_TRANSITION, PROFILE_ROUTE, SETTINGS_ROUTE } from 'src/constants';
import { DashboardLinkItem } from './DashbordLinkItem';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const MobileDashboardNavigation = () => {
  const [collapsed, setCollapsed] = useBoolean(false);

  const WIDTH = false ? 75 : 240;
  //?
  return (
    <Box
      height="100vh"
      position="relative"
      width={WIDTH}
      transition={DEFAULT_TRANSITION}
      transform={collapsed ? 'translateX(-210px)' : 'translateX(0)'}
      mr={collapsed ? '-210px' : '0'}
    >
      <Circle
        position="absolute"
        backgroundColor="gray.800"
        border="1px solid"
        borderColor="gray.700"
        right={-1.5}
        top={8}
        onClick={setCollapsed.toggle}
      >
        <Icon color="whiteAlpha.800" height={6} width={6} m={0.5} p={0.5}>
          {collapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
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
          <LinkBox pointerEvents={false ? 'none' : 'all'} position="relative">
            <Link href={'/'}>
              <Heading
                fontWeight="semibold"
                color="whiteAlpha.800"
                mt={5}
                px={3}
                mb={3}
                whiteSpace="nowrap"
                opacity={false ? 0 : 1}
                transition={DEFAULT_TRANSITION}
              >
                AppName
              </Heading>
            </Link>
          </LinkBox>
          <Divider width={false ? '65%' : '90%'} pr={4} opacity={0.2} />
          <Divider width="90%" pr={4} opacity={0} />
          <Divider width="90%" pr={4} opacity={0} />
          {DASHBOARD_ROUTES.map((route, i) => (
            <DashboardLinkItem {...route} isCollapsed={false} key={`item-dash-${i}`} />
          ))}
        </VStack>

        <VStack spacing={1} alignItems="left" pb={3}>
          <Divider width={false ? '65%' : '90%'} pr={4} opacity={0.2} />
          <Divider width="90%" pr={4} opacity={0} />
          <DashboardLinkItem {...SETTINGS_ROUTE} isCollapsed={false} />
          <DashboardLinkItem {...PROFILE_ROUTE} isCollapsed={false} />
        </VStack>
      </VStack>
    </Box>
  );
};
