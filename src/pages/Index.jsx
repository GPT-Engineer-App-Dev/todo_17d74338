import React, { useState } from "react";
import { VStack, Input, Button, useToast, Box, Heading, Text, IconButton, StackDivider, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack spacing={4} align="stretch" m={8}>
      <Box>
        <Heading mb={6}>Todo App</Heading>
        <HStack>
          <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} />
          <IconButton icon={<FaPlus />} onClick={handleAddTodo} colorScheme="blue" aria-label="Add todo" />
        </HStack>
      </Box>
      <VStack divider={<StackDivider />} borderColor="gray.100" borderWidth="2px" p={4} borderRadius="md" w="100%" maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }} alignItems="stretch" bg={bg}>
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Text flex={1} p={2}>
              {todo.content}
            </Text>
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteTodo(todo.id)} colorScheme="red" aria-label="Delete todo" />
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;
