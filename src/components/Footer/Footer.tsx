import { Center, Text } from '@chakra-ui/react';
import { usePageIsHigh } from 'src/hooks';

export const Footer = () => {
  const pageIsHigh = usePageIsHigh();

  return (
    <footer style={{ position: pageIsHigh ? 'relative' : 'absolute', bottom: '0', width: '100%' }}>
      <Center width="100%" backgroundColor="gray.800" py={2.5}>
        <Text color="whiteAlpha.800">Made with ❤️ by Error 404 team</Text>
      </Center>
    </footer>
  );
};
