import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { Center, Spinner, Box, Heading, Stack } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

import { UserContext } from "./../contexts/userContext";
import { instance } from "./../api";

const Login = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUserInfo } = useContext(UserContext);

  let history = useHistory();

  const showErrorAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const googleResponseSuccess = (response) => {
    localStorage.setItem("token", response.tokenId);
    setIsLoading(true);
    instance
      .post("/user/login")
      .then((response) => {
        setUserInfo(response.data);
        setIsLoading(false);
        history.push("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        showErrorAlert();
      });
  };

  const googleResponseFailure = (response) => {
    showErrorAlert();
  };

  return (
    <Center h="100vh">
      {showAlert && <AlertMessage visible={showAlert} />}
      <Box backgroundColor="gray.100" width="50%" height="50%">
        <Center h="100%">
          <Stack spacing="5%">
            <Heading as="h3" size="md">
              Please login:
            </Heading>
            {isLoading ? (
              <Spinner color="red.500" />
            ) : (
              <GoogleLogin
                clientId="95567586964-s70ovl5v4i8vdlss5m37ltd8t5hnqov3.apps.googleusercontent.com"
                onSuccess={googleResponseSuccess}
                onFailure={googleResponseFailure}
              />
            )}
          </Stack>
        </Center>
      </Box>
    </Center>
  );
};

const AlertMessage = () => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      position="fixed"
      top="20px"
      width="75%"
    >
      <AlertIcon />
      <AlertTitle fontSize="sm">
        Sorry, couldn't authenticate! Please try again.
      </AlertTitle>
    </Alert>
  );
};

export default Login;
