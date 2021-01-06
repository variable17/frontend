import React, { useContext, useEffect, useState } from "react";
import { Box, Heading, Stack, Avatar, Center } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { UserContext } from "./../contexts/userContext";

import Form from "./../components/form";
import CareProviderList from "../components/careProviderList";

import { instance } from "./../api/index";

const Home = () => {
  const history = useHistory();
  const { userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [pinCode, setPinCode] = useState("");

  useEffect(() => {
    const keys = Object.keys(userInfo);
    if (keys.length === 0) {
      alert("Please login first.");
      history.push("/");
    }
  });

  const submitForm = () => {
    if (pinCode.trim() === "") {
      alert("Please enter valid pin code.");
    } else {
      setIsLoading(true);
      instance
        .post("/get_network", { pin_code: Number(pinCode) })
        .then((response) => {
          setIsLoading(false);
          setData(response.data.data);
        })
        .catch((error) => {
          setIsLoading(false);
          const response = error.response;
          if (response && response.status === 401) {
            alert("Invalid credentials.");
            history.push("/");
          } else {
            alert("Something went wrong.");
          }
        });
    }
  };

  return (
    <Box width="80%" height="100vh" margin="auto">
      <Heading as="h1" size="2xl" marginY="2%">
        Search healthcare providers
      </Heading>
      <Stack direction="row" marginY="2%">
        <Avatar name={userInfo.name} src={userInfo.picture} />
        <Heading as="h1" size="xl">
          Hi {userInfo.name},
        </Heading>
      </Stack>

      <Form pinCode={pinCode} setPinCode={setPinCode} submitForm={submitForm} />

      <Center height="100px">
        {isLoading ? (
          <p>Fetching ...</p>
        ) : data.length === 0 ? (
          <p>No result ...</p>
        ) : (
          <CareProviderList data={data} />
        )}
      </Center>
    </Box>
  );
};

export default Home;
