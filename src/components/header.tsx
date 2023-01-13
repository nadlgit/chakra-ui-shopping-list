import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

export function ShoppingHeader() {
  const { toggleColorMode } = useColorMode();
  return (
    <HStack spacing={{ base: 2, md: 4 }} paddingY={4}>
      <Heading as="h1" paddingLeft={3}>
        Shopping list
      </Heading>
      <IconButton
        aria-label="Toggle color mode"
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        variant="ghost"
        colorScheme="gray"
        isRound
        onClick={toggleColorMode}
      />
    </HStack>
  );
}
