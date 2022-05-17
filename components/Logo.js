import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Image alt="Ladl logo" src={"/LadL_logo150px_2.png"} width={75} height={75} />
    </Box>
  );
}
