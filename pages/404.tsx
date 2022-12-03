import { Button, Center, Heading, LinkBox, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { Footer } from '../src/components/Footer';

type Props = {
  children: React.ReactNode;
};

export default function error404() {
  return (
    <Center h="100vh">
      <VStack height="100%" justifyContent="center" alignItems="center" my="auto">
        <Heading fontWeight="semibold" fontSize={['3xl', '4xl', '6xl']} lineHeight="1">
          There is nothing there
        </Heading>
        <Text fontSize={['xl', '2xl']} pb={6}>
          maybe you should try to go back?
        </Text>
        <LinkBox>
          <Link href="/">
            <Button
              size={['md', 'lg']}
              backgroundColor="teal.300"
              _hover={{ backgroundColor: 'teal.200' }}
            >
              Take me back!
            </Button>
          </Link>
        </LinkBox>
      </VStack>
      <Footer />
    </Center>
  );
}
