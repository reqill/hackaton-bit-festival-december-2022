import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitDisabled?: boolean;
  submitText?: string;
  cancelText?: string;
};

export const Dialog: FC<DialogProps> = ({
  children,
  onClose,
  open,
  title,
  cancelText = 'Close',
  description,
  onSubmit,
  submitDisabled,
  submitText = 'Submit',
}) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontWeight="semibold" fontSize="2xl">
            {title}
          </Heading>
          <Text>{description}</Text>
        </ModalHeader>
        <ModalCloseButton fontSize={14} mt={1.5} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={onClose}>{cancelText}</Button>
            {typeof onSubmit === 'function' && (
              <Button onClick={onSubmit} disabled={submitDisabled} backgroundColor="teal.300">
                {submitText}
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
