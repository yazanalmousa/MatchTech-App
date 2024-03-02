import React, { useEffect, useState } from "react";
import "../landingpage.css";
import gsap from "gsap";
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    let tl = gsap.timeline();
    tl.to(".box1", { duration: 1, y: 100 }, 0.5)
      .to(".box2", { duration: 1, x: 300 }, "-=1")
      .to(".box3", { duration: 1, y: 100 });
  }, []);

  const handleClick = () => {
    gsap.registerEffect({
      name: "fade",
      effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
      },
      defaults: { duration: 2 }, //defaults get applied to any "config" object passed to the effect
      extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
    });

    let tl = gsap.timeline();
    tl.to(".box1", { duration: 1, opacity: 0 }) // Assuming fading out, adjust as needed
      .to(".box2", { duration: 1, opacity: 0 }, "+=0.5")
      .to(".box3", {
        duration: 2,
        opacity: 0,
        onComplete: () => setNavigate(true),
      });
  };

  return (
    <Box>
      {navigate && <Navigate to="/home" />}
      <Heading
        fontFamily={"Roboto"}
        className="box1"
        textAlign={"center"}
        color={"white"}
        fontSize={"15rem"}
        textShadow="3px 3px #EE4266"
      >
        TechMatch AI
      </Heading>
      <Box color={"white"} mt={"2rem"}>
        <Text
          className="box2"
          fontFamily={"Roboto"}
          fontSize={"2rem"}
          textShadow="1px 1px #EE4266"
        >
          {" "}
          Aligning Your Project Goals with the Perfect Technology Solutions
        </Text>
      </Box>
      <Box className="box3" color={"white"}>
        <Center>
          <Button
            textShadow="0.5px 0.5px #EE4266"
            colorScheme="teal"
            variant="outline"
            border={"1px solid white"}
            w={"10rem"}
            h={"3rem"}
            borderRadius={"10px"}
            transition={"1s"}
            onClick={handleClick}
            _hover={{
              transform: "scale(1.1)",
            }}
          >
            Lets Start
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default LandingPage;
