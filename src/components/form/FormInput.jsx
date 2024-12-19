// Third party imports
import { Controller } from "react-hook-form";

// Custom Component Imports
import CustomTextField from "@/@core/components/mui/TextField";

const FormInput = ({
  name,
  control,
  label,
  errors,
  disabled,
  placeholder,
  value,
  fullWidth,
  type,
  InputProps,
  isHideArrowIcon = false,
  onChangeCallback,
  ...rest
}) => {
  /**
   * The function `numberInputOnWheelPreventChange` prevents the input field from changing when the user
   * scrolls the mouse wheel.
   */
  const numberInputOnWheelPreventChange = (e) => {
    if (e.type === "wheel") {
      // e.target.blur();
      e.preventDefault();
      e.stopPropagation();
    }
  };

  /**
   * The function `numberInputOnKeyDownPreventChange` prevents input changes in a number input field for
   * all keys except numbers and specific control keys.
   */
  const numberInputOnKeyDownPreventChange = (e) => {
    // List of keys we want to allow (numbers and control keys like Backspace, Arrow keys)
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Delete",
      "Tab",
    ];

    // Prevent default if the key is not a number or allowed key
    if (!allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * The function `removeLeadingZeros` removes leading zeros from a given number string.
   * @returns The `removeLeadingZeros` function takes a `numberString` as input, converts it to a string
   * (if it's not already a string), and then removes any leading zeros from the string. The regular
   * expression `^0+(?=\d)` is used to match and replace any leading zeros with an empty string. The
   * function returns the modified string with leading zeros removed.
   */
  const removeLeadingZeros = (numberString) => {
    return numberString?.toString()?.replace(/^0+(?=\d)/, "");
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value: formValue, onChange, onBlur } }) => {
          const isTextarea = type === "textarea";

          return (
            <CustomTextField
              {...rest}
              fullWidth={fullWidth}
              disabled={disabled}
              type={type || "text"}
              multiline={isTextarea}
              rows={isTextarea ? 3 : 1}
              value={removeLeadingZeros(value ?? formValue ?? "")}
              name={name}
              label={label}
              onChange={(e) => {
                onChange(e);
                onChangeCallback?.(e);
              }}
              onBlur={onBlur}
              error={errors}
              onWheel={
                type === "number" ? numberInputOnWheelPreventChange : undefined
              }
              onKeyDown={
                type === "number"
                  ? numberInputOnKeyDownPreventChange
                  : undefined
              }
              helperText={errors?.message}
              placeholder={placeholder}
              InputProps={
                isHideArrowIcon
                  ? {
                      inputProps: {
                        style: {
                          // Hide the arrows
                          MozAppearance: "textfield",
                        },
                      },
                    }
                  : InputProps
              }
            />
          );
        }}
      />
    </>
  );
};

export default FormInput;
