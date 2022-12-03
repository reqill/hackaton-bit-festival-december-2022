import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Icon,
  LinkBox,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DEFAULT_TRANSITION, NAV_ROUTES } from 'src/constants';

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <Box
        userSelect="none"
        transition={DEFAULT_TRANSITION}
        borderRadius={5}
        _hover={{
          backgroundColor: 'gray.100',
        }}
        onClick={setIsOpen.toggle}
        zIndex={999999}
      >
        <Icon aria-label="menu" background="transparent" width={7} height={7} m={1}>
          {isOpen ? <XMarkIcon /> : <Bars3Icon />}
        </Icon>
      </Box>
      <Drawer isOpen={isOpen} onClose={setIsOpen.off}>
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius={15} borderBottomLeftRadius={15}>
          <VStack justifyContent="center" alignItems="center" height="100%">
            {NAV_ROUTES.map((path, i) => (
              <Box
                userSelect="none"
                transition={DEFAULT_TRANSITION}
                borderRadius={7}
                _hover={{
                  backgroundColor: 'gray.100',
                }}
                onClick={setIsOpen.toggle}
                zIndex={999999}
              >
                <LinkBox width={200}>
                  <Link href={path.relativePath}>
                    <Text fontSize="2xl" textAlign="center" py={2}>
                      {path.pageName}
                    </Text>
                  </Link>
                </LinkBox>
              </Box>
            ))}
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
};
