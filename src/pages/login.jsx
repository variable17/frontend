import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { Center, Spinner } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

import { instance } from "./../api";

const Login = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  const showErrorAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const googleResponseSuccess = (response) => {
    console.log(response);
    localStorage.setItem("token", response.tokenId);
    setIsLoading(true);
    instance
      .post("/user/login")
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        history.push("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        showErrorAlert();
        console.log(error);
      });
  };

  const googleResponseFailure = (response) => {
    showErrorAlert();
  };

  return (
    <Center h="100vh">
      {showAlert && <AlertMessage visible={showAlert} />}
      {isLoading ? (
        <Spinner color="red.500" />
      ) : (
        <GoogleLogin
          clientId="95567586964-s70ovl5v4i8vdlss5m37ltd8t5hnqov3.apps.googleusercontent.com"
          onSuccess={googleResponseSuccess}
          onFailure={googleResponseFailure}
        />
      )}
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
