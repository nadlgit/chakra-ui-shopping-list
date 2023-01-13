import { VStack } from '@chakra-ui/react';
import { ShoppingHeader, ShoppingList } from './components';

export default function App() {
  return (
    <VStack padding={4}>
      <ShoppingHeader />
      <ShoppingList />
    </VStack>
  );
}
