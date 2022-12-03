import { Box, Heading, LinkBox, Skeleton, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

type DashboardCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  path: string;
};

export const DashboardCard: FC<DashboardCardProps> = ({ children, path, title, description }) => {
  return (
    <Box w="92%" h="100%">
      <VStack alignItems="left" h="100%" w="100%">
        <LinkBox h="100%" w="100%" minH={36} mb={12}>
          <Link href={path}>
            <Heading fontWeight="semibold" lineHeight={1}>
              {title}
            </Heading>
            <Text pl=".2rem" pt={1} mb={2} lineHeight="1rem">
              {description}
            </Text>
          </Link>
          <Skeleton borderRadius={15} speed={1.5} h="100%" w="100%">
            <Box h="100%" w="100%" backgroundColor="green.200" borderRadius={15}>
              {children}
            </Box>
          </Skeleton>
        </LinkBox>
      </VStack>
    </Box>
  );
};
