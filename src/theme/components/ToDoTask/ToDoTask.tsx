import {
  useDisclosure,
  Box,
  Card,
  Heading,
  IconButton,
  Tag,
  Button,
  Input,
  FormLabel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React from 'react';

const ToDoTask = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const importanceTags: { [key: number]: string[] } = {
    1: ['opcjonalny', 'green'],
    2: ['normalny', 'green'],
    3: ['ważny', 'red'],
    4: ['pilny', 'red'],
  };

  return (
    <Card width={['100%', '80%', '50%']} mt={2} mb={2} p={2} direction="column" variant="elevated">
      <Box display="flex" flexDirection="row" justifyContent="space-between" h={7}>
        <Heading as="h5" size="sm" fontWeight="semibold">
          {props.task.name}
        </Heading>
        <IconButton variant="outline" aria-label="Show menu" onClick={onOpen} border="none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </IconButton>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Zmień swoje zadanie</DrawerHeader>

            <DrawerBody>
              <FormLabel htmlFor="name" mb={2}>
                Zmień nazwę
              </FormLabel>
              <Input id="name" placeholder="Podaj nową nazwę zadania" />
              <FormLabel htmlFor="name" mt={2} mb={2}>
                Zmień tag
              </FormLabel>
              <Input id="name" placeholder="Podaj nową nazwę tagu" />
              <FormLabel htmlFor="importance" mt={2} mb={2}>
                Zmień priorytet
              </FormLabel>
              <Select
                options={[
                  {
                    label: 'opcjonalny',
                    value: 'opcjonalny',
                    variant: 'outline',
                  },
                  {
                    label: 'normalny',
                    value: 'normalny',
                  },
                  {
                    label: 'ważny',
                    value: 'ważny',
                  },
                  {
                    label: 'pilny',
                    value: 'pilny',
                  },
                ]}
              ></Select>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Anuluj
              </Button>
              <Button colorScheme="blue" onClick={onClose}>
                Zapisz
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box>
        <Tag size="sm" mr={3} colorScheme={importanceTags[props.task.importance][1]}>
          {importanceTags[props.task.importance][0]}
        </Tag>
        {props.task.tag ? <Tag size="sm">{props.task.tag} </Tag> : ''}
      </Box>
    </Card>
  );
};

export default ToDoTask;
