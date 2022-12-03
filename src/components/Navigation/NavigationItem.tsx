import { Box, LinkBox, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { DEFAULT_TRANSITION } from 'src/constants';
import { NavigationRoute } from 'src/types';
import { NavigationSubItem } from './NavigationSubitem';
import { ProfileLink } from './ProfileLink';
import { useState } from 'react';
import { SettingsLink } from './SettingsLink';

type NavigationItemProps = {} & NavigationRoute;

export const NavigationItem = ({
  pageName,
  relativePath,
  description,
  nestedRoutes,
}: NavigationItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isSafe, setIsSafe] = useState(true);

  const show = () => {
    if (isSafe) {
      setIsSafe(false);
      setIsRemoved(false);
      setTimeout(() => {
        setIsHovered(true);
        setIsSafe(true);
      }, 225);
    }
  };

  const hide = () => {
    if (isSafe) {
      setIsSafe(false);
      setIsHovered(false);
      setTimeout(() => {
        setIsRemoved(true);
        setIsSafe(true);
      }, 225);
    }
  };

  return (
    <>
      {!isRemoved && nestedRoutes && <Box position="absolute" inset={0} onMouseEnter={hide} />}
      <LinkBox
        userSelect="none"
        transition={DEFAULT_TRANSITION}
        borderRadius={5}
        _hover={{
          backgroundColor: 'gray.100',
        }}
        onMouseEnter={show}
      >
        <Link href={relativePath}>
          {pageName === 'Settings' ? (
            <SettingsLink />
          ) : pageName == 'Profile' ? (
            <ProfileLink />
          ) : (
            <Text px={4} py={1.5}>
              {pageName}
            </Text>
          )}
        </Link>
        {description ||
          (nestedRoutes && !isRemoved && (
            <VStack
              position="absolute"
              opacity={isHovered ? 1 : 0}
              transition={DEFAULT_TRANSITION}
              top={isHovered ? 10 : 8}
              pointerEvents={isHovered ? 'auto' : 'none'}
              backgroundColor="white"
              justifyContent="left"
              alignItems="flex-start"
              width={400}
              left={-150}
              pb={7}
              pt={6}
              px={7}
              gap={1}
              borderRadius={15}
              shadow="xl"
            >
              {nestedRoutes?.map((route, i) => (
                <NavigationSubItem
                  key={`subitem-menu-${i}`}
                  relativePath={`${route.relativePath}`}
                  pageName={route.pageName}
                  description={route.description}
                />
              ))}
            </VStack>
          ))}
      </LinkBox>
    </>
  );
};
