import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  IconButton,
  List,
  ListItem,
  Spacer,
  useColorModeValue,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import type { ComponentProps } from 'react';
import { ItemModal } from './item-modal';
import { addItem, deleteItem, getList, updateItem } from '../store';
import type { Item } from '../store';

type AddItemInfo = Parameters<typeof addItem>[1];
type UpdateItemInfo = Parameters<typeof updateItem>[1];
type DeleteItemInfo = Parameters<typeof deleteItem>[1];

export function ShoppingList() {
  const [list, dispatchList] = useReducer(listReducer, [], () => getList());
  const add = ({ name, qty, qtyUnit }: AddItemInfo) =>
    dispatchList({ type: 'ADD', item: { name, qty, qtyUnit } });
  const edit = ({ id, name, qty, qtyUnit }: Omit<UpdateItemInfo, 'checked'>) =>
    dispatchList({ type: 'UPDATE', item: { id, name, qty, qtyUnit } });
  const setChecked = ({ id, checked }: Required<Pick<UpdateItemInfo, 'id' | 'checked'>>) =>
    dispatchList({ type: 'UPDATE', item: { id, checked } });
  const remove = (itemId: DeleteItemInfo) => dispatchList({ type: 'DELETE', itemId });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const addModalProps: Omit<ComponentProps<typeof ItemModal>, 'isOpen' | 'onClose'> = {
    title: 'Add item',
    onSubmit: (name, qty, qtyUnit) => add({ name, qty, qtyUnit }),
  };
  const [modalProps, setModalProps] = useState(addModalProps);
  const openAddItem = () => {
    setModalProps(addModalProps);
    onOpen();
  };
  const openEditItem = (item: Item) => {
    setModalProps({
      title: 'Edit item',
      onSubmit: (name, qty, qtyUnit) => edit({ id: item.id, name, qty, qtyUnit }),
      itemName: item.name,
      itemQty: item.qty,
      itemQtyUnit: item.qtyUnit,
    });
    onOpen();
  };

  return (
    <VStack
      width="fit-content"
      minWidth={{ base: '100%', md: '25rem' }}
      maxWidth={{ base: '100%', md: '80%' }}
      padding={4}
      background={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      boxShadow="md"
    >
      <Button leftIcon={<PlusSquareIcon />} width="100%" onClick={openAddItem}>
        Add
      </Button>

      {list.length === 0 && <Text paddingTop={2}>Your list is empty.</Text>}

      <List width="100%">
        {list.map((item) => (
          <ListItem key={item.id}>
            <Flex align="center" gap={2} paddingY={1}>
              <Checkbox
                defaultChecked={item.checked}
                onChange={(e) => {
                  setChecked({ id: item.id, checked: e.target.checked });
                }}
                textDecoration={item.checked ? 'line-through' : 'none'}
              >
                {itemLabel(item)}
              </Checkbox>
              <Spacer />
              <ButtonGroup spacing={2}>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  onClick={() => openEditItem(item)}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => remove(item.id)}
                />
              </ButtonGroup>
            </Flex>
          </ListItem>
        ))}
      </List>

      <ItemModal isOpen={isOpen} onClose={onClose} {...modalProps} />
    </VStack>
  );
}

function itemLabel(item: Item) {
  return (
    item.name +
    (item.qty === undefined ? '' : ' (' + item.qty + (item.qtyUnit ? ' ' + item.qtyUnit : '') + ')')
  );
}

type ListReducerAction =
  | { type: 'ADD'; item: AddItemInfo }
  | { type: 'UPDATE'; item: UpdateItemInfo }
  | { type: 'DELETE'; itemId: DeleteItemInfo };
function listReducer(state: Item[], action: ListReducerAction) {
  const newState = [...state];
  switch (action.type) {
    case 'ADD':
      addItem(newState, action.item);
      break;
    case 'UPDATE':
      updateItem(newState, action.item);
      break;
    case 'DELETE':
      deleteItem(newState, action.itemId);
      break;
  }
  return newState;
}
