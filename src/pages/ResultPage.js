import { React, useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import ResultContext from "../Helper/Context";
import { Navigate } from "react-router-dom";


const ResultPage = () => {
  const { result } = useContext(ResultContext);

  return (
    <Flex
      className="box"
      flexDir="row"
      gap="70"
      mx="3rem"
      my="3rem"
      justifyContent="space-around"
    >
      {result == null ? <Navigate to='/home'/> : ""}
      <Box
        fontWeight="bold"
        h="80vh"
        w="0.2rem"
        flexDir="column"
        borderRadius="10px"
        flexGrow="0.8"
        bg="white"
        boxShadow="5px 5px rgba(0, 0, 0, 0.3)"
        border="0.3rem solid #EE4266"
        p="0.5rem"
        overflow="scroll"
      >
        <Text style={{ whiteSpace: 'pre-wrap', margin: '20px' }}>{result.results}</Text>
      </Box>
    </Flex>
  );
};

export default ResultPage;
