import React from "react";
import { Stack, NumberInput, NumberInputField, Button } from "@chakra-ui/react";

const Form = (props) => {
  const { pinCode, setPinCode, submitForm } = props;

  return (
    <Stack direction="column" width="50%">
      <NumberInput
        marginY="2%"
        value={pinCode}
        onChange={(value) => {
          setPinCode(value);
        }}
      >
        <NumberInputField placeholder="Area pincode ex: 110001" />
      </NumberInput>

      <Button
        colorScheme="blue"
        width="200px"
        marginY="3%"
        onClick={() => submitForm()}
      >
        Search
      </Button>
    </Stack>
  );
};

export default Form;
