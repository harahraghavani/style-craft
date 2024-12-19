"use client";

import React from "react";
import { useConstantValues } from "@/hooks/Constant/useConstantValues";
import FormInput from "@/components/form/FormInput";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";

const ShadowInputWrapper = () => {
  // Form hook setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    mode: "all",
  });

  const { boxShadow, updateBoxShadow } = useConstantValues();

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap={4}>
        {/* HORIZONAL OFFSET */}
        <Box display="flex" gap={4} alignItems="center">
          <Typography>X</Typography>
          <Box>
            <FormInput
              name="horizonalOffset"
              errors={errors?.horizonalOffset}
              control={control}
              type="number"
              fullWidth={true}
              onChangeCallback={(e) => {
                const value = e?.target?.value;
                updateBoxShadow({ horizonalOffset: Number(value) });
              }}
            />
          </Box>
          <Typography
            flex={1}
          >{`${boxShadow.horizonalOffset}px Horizontal Offset`}</Typography>
        </Box>
        {/* VERTICAL OFFSET */}
        <Box display="flex" gap={4} alignItems="center">
          <Typography>Y</Typography>
          <Box>
            <FormInput
              name="verticalOffset"
              errors={errors?.verticalOffset}
              control={control}
              type="number"
              fullWidth={true}
              onChangeCallback={(e) => {
                const value = e?.target?.value;
                updateBoxShadow({ verticalOffset: Number(value) });
              }}
            />
          </Box>
          <Typography
            flex={1}
          >{`${boxShadow.verticalOffset}px Vertical Offset`}</Typography>
        </Box>
        {/* BLUR */}
        <Box display="flex" gap={4} alignItems="center">
          <Typography>B</Typography>
          <Box>
            <FormInput
              name="blur"
              errors={errors?.blur}
              control={control}
              type="number"
              fullWidth={true}
              onChangeCallback={(e) => {
                const value = e?.target?.value;
                updateBoxShadow({ blur: Number(value) });
              }}
            />
          </Box>
          <Typography flex={1}>{`${boxShadow.blur}px Blur`}</Typography>
        </Box>
        {/* SPREAD */}
        <Box display="flex" gap={4} alignItems="center">
          <Typography>S</Typography>
          <Box>
            <FormInput
              name="spread"
              errors={errors?.spread}
              control={control}
              type="number"
              fullWidth={true}
              onChangeCallback={(e) => {
                const value = e?.target?.value;
                updateBoxShadow({ spread: Number(value) });
              }}
            />
          </Box>
          <Typography flex={1}>{`${boxShadow.spread}px Spread`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShadowInputWrapper;
