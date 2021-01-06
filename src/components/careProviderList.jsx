import React from "react";
import { Box } from "@chakra-ui/react";
import CareProvider from "./careProvider";
import "./custom.css";

const CareProviderList = (props) => {
  const { data } = props;

  return (
    <Box
      as="section"
      margin="auto"
      display="flex"
      width="100%"
      minHeight="350px"
      overflowX="auto"
      className="snapScroll"
    >
      {data.map((provider, index) => {
        return <CareProvider key={index} provider={provider} />;
      })}
    </Box>
  );
};

export default CareProviderList;
