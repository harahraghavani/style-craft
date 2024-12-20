"use client";

// Third party imports
import { Controller } from "react-hook-form";

// MUI Imports
import { FormHelperText, Checkbox, FormControlLabel } from "@mui/material";

const FormCheckBox = ({ control, name, label, onChangeCallback }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                inputRef={ref}
                checked={value ? value : false}
                onChange={(e) => {
                  onChange(e.target.checked);
                  onChangeCallback?.(e.target.checked);
                }}
                inputProps={{ "aria-label": label }}
              />
            }
            label={label}
          />
        );
      }}
    />
  );
};

export default FormCheckBox;
