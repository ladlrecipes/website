import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Image alt="Ladl logo" src={"/logo.png"} width={1000} height={1000} />
    </Box>
  );
}
