// React Imports
import React from 'react'

// Third-party Imports
import { Controller } from 'react-hook-form'

// MUI Imports
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

const CustomSelectField = ({
  name,
  control,
  label,
  errors,
  disabled,
  placeholder,
  fullWidth,
  options,
  selectProps,
  required
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel size={selectProps?.size === 'small' ? 'small' : 'normal'} error={Boolean(errors)}>
        {label}
      </InputLabel>

      <Controller
        name={name}
        control={control}
        rules={{ required: required === true ? true : false }}
        render={({ field: { value, onChange } }) => (
          <Select
            name={name}
            fullWidth={fullWidth}
            disabled={disabled}
            placeholder={placeholder}
            error={Boolean(errors)}
            label={label}
            value={value}
            onChange={onChange}
            sx={{
              maxHeight: 38
            }}
            {...selectProps}
          >
            {options.map(opt => {
              return (
                <MenuItem key={opt.name} value={opt.value}>
                  {opt.name}
                </MenuItem>
              )
            })}
          </Select>
        )}
      />
      <FormHelperText
        sx={{
          mx: 0,
          mt: '4px',
          color: 'error.main'
        }}
      >
        {errors?.message}
      </FormHelperText>
    </FormControl>
  )
}

export default CustomSelectField
