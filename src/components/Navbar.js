import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  UnorderedList,
  ListItem,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const [navigate, setNavigate] = useState(false);
  const handleClick = () => {
    setNavigate(true);
  };
  useEffect(() => {
    setNavigate(false);
  }, [navigate]);
  return (
    <>
      {navigate && <Navigate to="/" />}
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box ml={"8rem"} mt={"1rem"}>
          <Flex
            flexDir={"row"}
            alignItems={"center"}
            gap={"10"}
            color={"white"}
            fontSize={"1.2rem"}
            fontWeight={"bold"}
          >
            <Image
              src="./assets/icons8-ai-100.png"
              transition={"1s"}
              h={"70"}
              w={"5"}
              onClick={handleClick}
            />
            <Text>TechMatch AI</Text>
          </Flex>
        </Box>
        <Box mr={"8rem"} mt={"1rem"} color={"white"} w={"15rem"}>
          <UnorderedList listStyleType={"none"}>
            <Flex flexDir={"row"} justifyContent={"space-between"}>
              <ListItem>
                <Button textShadow="2px 2px black">About Us</Button>
              </ListItem>
              <ListItem>
                <Button
                  variant="outline"
                  rightIcon={<FaPlus />}
                  textShadow="2px 2px black"
                >
                  New Session
                </Button>
              </ListItem>
            </Flex>
          </UnorderedList>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
