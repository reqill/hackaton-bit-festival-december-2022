import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Center, Heading, LinkBox, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Footer } from '../Footer';

type Props = {
  children: React.ReactNode;
};

export const PleaseLogin: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  const isPathMainPage = router.pathname === '/';

  if (user || isPathMainPage) {
    return <>{children}</>;
  }
  return (
    <Center h="100vh">
      <VStack height="100%" justifyContent="center" alignItems="center" my="auto">
        <Heading pl={5} fontWeight="semibold" fontSize={['4xl', '6xl']} lineHeight="1">
          Wait a second...
        </Heading>
        <Text fontSize={['xl', '2xl']} pb={6}>
          you need to login first!
        </Text>
        <LinkBox>
          <Link href="/api/auth/login">
            <Button
              size={['md', 'lg']}
              backgroundColor="teal.300"
              _hover={{ backgroundColor: 'teal.200' }}
            >
              Sign in!
            </Button>
          </Link>
        </LinkBox>
      </VStack>
      <Footer />
    </Center>
  );
};
