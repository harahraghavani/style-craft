"use client";

import React from "react";
import { useConstantValues } from "@/hooks/Constant/useConstantValues";
import { Box } from "@mui/material";

const ShadowPreview = () => {
  const { getBoxShadowString } = useConstantValues();

  return (
    <Box display="flex" justifyContent="center">
      <Box
        boxShadow={getBoxShadowString()}
        height={350}
        width={400}
        borderRadius={2}
        border={"1px solid #d9d9d9"}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={"100%"}
        >
          Preview Of Box Shadow
        </Box>
      </Box>
    </Box>
  );
};

export default ShadowPreview;
