import { Heading, HStack, LinkBox, Square, Text, VStack } from '@chakra-ui/react';
import { DEFAULT_TRANSITION } from 'src/constants';
import { useState } from 'react';
import { NavigationRoute } from 'src/types';
import Link from 'next/link';

type NavigationSubItemProps = {} & Omit<NavigationRoute, 'nestedRoutes'>;

export const NavigationSubItem = ({
  pageName,
  relativePath,
  description,
}: NavigationSubItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <LinkBox
      userSelect="none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      pointerEvents="all"
      cursor="pointer"
      width="100%"
    >
      <Link href={relativePath}>
        <HStack alignItems="center" width="100%" justifyContent="space-between">
          <VStack justifyContent="left" alignItems="flex-start" m="0" maxW={250}>
            <Heading fontWeight="semibold" fontSize="md" textAlign="left">
              {pageName}
            </Heading>
            <Text fontSize="sm" display="block" transform="translateY(-5px)">
              {description}
            </Text>
          </VStack>
          <Square
            size={16}
            backgroundColor="gray.100"
            borderRadius={15}
            transition={DEFAULT_TRANSITION}
            transform={isHovered ? 'scale(1.05) rotate(5deg)' : 'scale(1) rotate(0deg)'}
          />
        </HStack>
      </Link>
    </LinkBox>
  );
};
