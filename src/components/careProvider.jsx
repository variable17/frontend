import React from "react";
import { Box, Image, Badge, Stack } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";

import "./custom.css";

const CareProvider = (props) => {
  const { provider } = props;
  const imageUrl =
    "https://revcycleintelligence.com/images/site/article_headers/_normal/hospital%2C_green.jpg";

  return (
    <Box
      minWidth={["100%", "calc(90% / 2.5)", "calc(90% / 3)", "calc(90% / 4)"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="snap-scroll-child"
      marginX="20px"
    >
      <Image src={imageUrl} alt="care provider" />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {provider.type.split(".")[1]}
          </Badge>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {provider.name}
        </Box>

        <Box as="span" color="gray.600" fontSize="sm">
          {provider.address}
        </Box>

        <Stack direction="column" spacing={0} marginY="3%">
          <Box as="span" color="gray.600" fontSize="sm">
            <EmailIcon mr="4px" cursor="pointer" />
            {provider.email}
          </Box>

          <Box as="span" color="gray.600" fontSize="sm">
            <PhoneIcon mr="4px" cursor="pointer" />
            {provider.contact}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CareProvider;
