import { Container, Box, AspectRatio } from "@chakra-ui/react";
import Board from "components/Board";
import Info from "components/Board/Info";

const Checkers = () => {
  return (
    <Box
      w="100vw"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.lg" display="flex" gap="2">
        <AspectRatio ratio={1} flex="1">
          <Box mx="auto">
            <Board />
          </Box>
        </AspectRatio>

        <Box border="1px" borderColor="black" p="1">
          <Info />
        </Box>
      </Container>
    </Box>
  );
};

export default Checkers;
