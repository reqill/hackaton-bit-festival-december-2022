import { Center, Link, Text } from '@chakra-ui/react';
import { usePageIsHigh } from 'src/hooks';

export const Footer = () => {
  const pageIsHigh = usePageIsHigh();

  return (
    <footer style={{ position: pageIsHigh ? 'relative' : 'absolute', bottom: '0', width: '100%' }}>
      <Center width="100%" py={2.5}>
        <Text color="blackAlpha.800">
          Made with ❤️ by{' '}
          <Link href="https://github.com/reqill/hackaton-bit-festival-december-2022">
            Error 404 team
          </Link>
        </Text>
        <Text color="blackAlpha.400" display="inline">
          &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; v.0.1.0a
        </Text>
      </Center>
    </footer>
  );
};
