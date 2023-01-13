import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react';
import type { FormEventHandler } from 'react';

type ItemModalProps = {
  title: string;
  itemName?: string;
  itemQty?: number;
  itemQtyUnit?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, qty?: number, qtyUnit?: string) => void;
};

export function ItemModal({
  title,
  itemName,
  itemQty,
  itemQtyUnit,
  isOpen,
  onClose,
  onSubmit,
}: ItemModalProps) {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const name = data.get('name') as string;
    const qty = Number.parseInt(data.get('qty') as string) || undefined;
    const qtyUnit = (data.get('qtyUnit') as string) || undefined;
    onSubmit(name, qty, qtyUnit);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent paddingY={2}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Item name</FormLabel>
              <Input
                name="name"
                defaultValue={itemName}
                onChange={(e) => {
                  e.target.value = e.target.value.trimStart();
                }}
              />
            </FormControl>
            <Flex align="flex-end" gap={2}>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input name="qty" type="number" min="0" defaultValue={itemQty} />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <VisuallyHidden>Quantity unit</VisuallyHidden>
                </FormLabel>
                <Input
                  name="qtyUnit"
                  placeholder="unit"
                  defaultValue={itemQtyUnit}
                  onChange={(e) => {
                    e.target.value = e.target.value.trimStart();
                  }}
                />
              </FormControl>
            </Flex>
            <ButtonGroup colorScheme="teal">
              <Button type="submit">Save</Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
