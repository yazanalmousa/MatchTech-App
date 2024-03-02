import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  Box,
  Text,
  Flex,
  Heading,
  Image,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { BsUpload } from "react-icons/bs";
import gsap from "gsap";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ResultContext from "../Helper/Context";

const Home = ({ onFileDrop }) => {
  const { setResult } = useContext(ResultContext);

  const [navigate, setNavigate] = useState(false);
  useEffect(() => {
    gsap.registerEffect({
      name: "fade",
      effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, opacity: 1 });
      },
      defaults: { duration: 3 }, //defaults get applied to any "config" object passed to the effect
      extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
    });

    let tl = gsap.timeline();
    tl.fade(".box", { duration: 3 }).fade(".box2", { duration: 1 }, "-=2");

    // or directly on timelines:
  }, []);

  const [fileDropped, setFile] = useState(null);
  const handleDragOver = useCallback((event) => {
    event.preventDefault(); // Prevent file from being opened
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0]; // Get the first file
      if (file) {
        setFile(file);
        console.log(file); // This will log the dropped file object
      }
    },
    [] // Removed [onFileDrop] dependency as it's not used
  );

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
      console.log(file);
    }
  };
  const handleGenerateClick = async () => {
    const formData = new FormData();
    formData.append("file", fileDropped);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/result/",
        formData
      );
      setResult(response.data);
      console.log("File uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading file", error);
    }

    gsap.registerEffect({
      name: "fade",
      effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
      },
      defaults: { duration: 2 }, //defaults get applied to any "config" object passed to the effect
      extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
    });

    let tl = gsap.timeline();
    tl.fade(".box", { duration: 5 }).to(".box2", {
      duration: 2,
      opacity: 0,
      onComplete: () => setNavigate(true),
    });
  };
  return (
    <Flex
      className="box"
      flexDir={"row"}
      gap={"70"}
      mx={"3rem"}
      my={"3rem"}
      opacity={"0"}
    >
      {navigate && <Navigate to="/result" />}
      <Box
        h={"80vh"}
        w={"0.2rem"}
        flexDir={"column"}
        borderRadius={"10px"}
        flexGrow={"1"}
        bg={"white"}
        boxShadow="5px 5px rgba(0, 0, 0, 0.3)"
      >
        <Flex flexDir={"column"} gap={"10"} p="1rem">
          <Heading fontSize={"1.5rem"} fontWeight={"bold"}>
            TechMatch AI
          </Heading>
          <Text>Find Your Perfect Tech Stack with AI 🌐</Text>
          <Text>
            Powered by AI Insights 🧠 Effortlessly input your project
            requirements and let our advanced AI algorithm recommend the optimal
            technology stack. From frontend frameworks to backend services and
            databases, discover a tailored set of tools designed to elevate your
            project's success within minutes.
          </Text>
          <Heading fontSize={"1.5rem"} fontWeight={"bold"}>
            Customize Your Tech Stack Discovery 🎨{" "}
          </Heading>
          <Text>
            Prefer a specific programming language or have unique scalability
            needs? Customize your query to align with your project's specific
            requirements. Whether you're building a web app, mobile application,
            or a complex software solution, our AI provides personalized
            recommendations, ensuring you choose the best technologies to bring
            your vision to life.
          </Text>
        </Flex>
      </Box>
      <Box
        h={"80vh"}
        flexDir={"colmun"}
        borderRadius={"10px"}
        flexGrow={"2"}
        bg={"white"}
        boxShadow="5px 5px rgba(0, 0, 0, 0.3)"
        opacity={"0"}
        className="box2"
      >
        <Flex flexDir={"column"} gap={"10"} p="1rem">
          {!fileDropped && (
            <Heading fontSize={"1.5rem"} fontWeight={"bold"}>
              Upload File:
            </Heading>
          )}
          {fileDropped && (
            <Button
              w={"7rem"}
              h={"3rem"}
              borderRadius={"1rem"}
              bg={"#EE4266"}
              color={"black"}
              textShadow="0.5px 0.5px #EE4266"
              onClick={handleGenerateClick}
            >
              Generate
            </Button>
          )}
          <Input
            type="file"
            id="fileupload"
            display={"none"}
            onChange={handleFileUpload}
          />
          <FormLabel htmlFor="fileupload">
            <Box
              height={"34rem"}
              border={"2px solid black"}
              borderRadius={"10px"}
              p={"1rem"}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Flex
                flexDir={"column"}
                alignItems={"center"}
                h="80%"
                py={"6rem"}
              >
                <Flex flexDir={"column"} alignItems={"center"}>
                  <BsUpload fontSize={"9rem"} />
                  <Text fontSize={""}>Drop File Here </Text>
                </Flex>
                <Flex
                  flexDir={"column"}
                  h={"30%"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                >
                  <Flex flexDir={"row"} gap={"10"} alignItems={"center"}>
                    <Text>Or Click To Upload File</Text>
                    <Image
                      src="./assets/pdf-svgrepo-com.svg"
                      h={"2rem"}
                      w={"2rem"}
                    />
                  </Flex>
                  {fileDropped && (
                    <Text color={"#387ADF"} fontWeight={"bold"}>
                      👉 {fileDropped.name}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Box>
          </FormLabel>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
