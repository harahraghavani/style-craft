"use client";
import { useCallback } from "react";
import { useConstantValues } from "@/hooks/Constant/useConstantValues";
import FormInput from "@/components/form/FormInput";
import { useFormContext } from "react-hook-form";
import { Box, Card, Typography } from "@mui/material";
import FormColorPicker from "@/components/form/FormColorPicker";
import FormCheckBox from "@/components/form/FormCheckBox";

const ShadowInputWrapper = () => {
  const { boxShadow, updateBoxShadow } = useConstantValues();

  // Form hook setup
  const {
    control,
    setValue,
    formState: { errors, isDirty },
  } = useFormContext();

  const inputs = [
    { label: "X", name: "horizontalOffset", suffix: "Horizontal Offset" },
    { label: "Y", name: "verticalOffset", suffix: "Vertical Offset" },
    { label: "B", name: "blur", suffix: "Blur" },
    { label: "S", name: "spread", suffix: "Spread" },
  ];

  const handleNumberInputChange = useCallback(
    (field, value) => {
      updateBoxShadow({ [field]: value });
      setValue(field, value, { shouldDirty: true });
    },
    [updateBoxShadow]
  );

  const handleColorChange = useCallback(
    (color) => {
      updateBoxShadow({
        color: color.hex,
      });
    },
    [updateBoxShadow]
  );

  return (
    <Box display="flex" justifyContent="flex-start">
      <Card
        sx={{
          padding: 6,
          boxShadow: "none",
          borderRadius: 2,
          border: "1px solid #d9d9d9",
          bgcolor: "transparent",
          position: "relative",
          overflow: "visible",
        }}
      >
        <Box display="flex" flexDirection="column" gap={4}>
          {inputs.map((input) => (
            <Box key={input.name} display="flex" gap={4} alignItems="center">
              <Typography>{input.label}</Typography>
              <Box>
                <FormInput
                  name={input.name}
                  errors={errors[input.name]}
                  control={control}
                  type="number"
                  fullWidth={true}
                  onChangeCallback={(e) =>
                    handleNumberInputChange(input.name, Number(e.target.value))
                  }
                />
              </Box>
              <Typography flex={1}>
                {`${boxShadow[input.name]}px ${input.suffix}`}
              </Typography>
            </Box>
          ))}
          {/* COLOR */}
          <Box display="flex" gap={4} alignItems="center">
            <Typography>C</Typography>
            <Box>
              <FormColorPicker
                control={control}
                name="color"
                value={boxShadow.color}
                onChangeCallback={(value) => {
                  handleNumberInputChange("color", value?.hex);
                }}
              />
            </Box>
            <Typography flex={1} textTransform={"uppercase"}>
              {boxShadow.color}
            </Typography>
          </Box>
          {/* INSET */}
          <Box>
            <Box>
              <FormCheckBox
                name="inset"
                control={control}
                value={boxShadow.inset}
                error={errors.inset}
                label="Inset"
                onChangeCallback={(value) => {
                  handleNumberInputChange("inset", value);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ShadowInputWrapper;
