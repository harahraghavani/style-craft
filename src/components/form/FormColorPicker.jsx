"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { SwatchesPicker } from "react-color";
import { Controller } from "react-hook-form";

export default function FormColorPicker({
  name,
  control,
  value,
  opacity,
  onChangeCallback,
}) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={() => setShowPicker(!showPicker)}
        style={{
          backgroundColor: value,
          opacity: opacity,
          width: "36px",
          height: "36px",
          padding: 0,
          border: "2px solid #fff",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
        }}
      />
      {showPicker && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 9999,
            top: "100%",
            marginTop: "8px",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onClick={() => setShowPicker(false)}
          />
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              return (
                <SwatchesPicker
                  color={{ hex: field.value || value }}
                  onChange={(color) => {
                    field.onChange(color.hex);
                    onChangeCallback?.(color);
                  }}
                />
              );
            }}
          />
        </Box>
      )}
    </Box>
  );
}
