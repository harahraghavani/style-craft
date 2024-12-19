'use client'

// Third party imports
import { Controller } from 'react-hook-form'

// MUI Imports
import { MenuItem, Select, FormHelperText, InputLabel, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const FormDropDown = ({
  name,
  control,
  label,
  error,
  options,
  required,
  placeholder,
  selectProps,
  onChangeCallback,
  ...rest
}) => {
  const theme = useTheme()

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
        <InputLabel error={Boolean(error)} sx={{ fontSize: 14, color: theme.palette.text.primary, lineHeight: '14px' }}>
          {label} {required ? '*' : ''}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          rules={{ required: required === undefined ? true : required }}
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                {...rest}
                fullWidth
                error={Boolean(error)}
                name={name}
                value={value}
                onChange={event => {
                  onChange(event)
                  if (onChangeCallback) {
                    onChangeCallback?.(event)
                  }
                }}
                displayEmpty
                IconComponent={() => (
                  <i
                    className='tabler-chevron-down'
                    style={{
                      color: theme.palette.text.textLightColor
                    }}
                  ></i>
                )}
                renderValue={selectedValue => {
                  if (!selectedValue) {
                    return <Typography color={theme.palette.text.placeHolder}>{placeholder}</Typography>
                  }
                  const selectedOption = options?.find(option => option.value === selectedValue)

                  return selectedOption ? selectedOption.name : selectedValue
                }}
                sx={{
                  maxHeight: 38
                }}
                {...selectProps}
              >
                {options?.map(option => (
                  <MenuItem key={option?.name} value={option?.value}>
                    {option?.name}
                  </MenuItem>
                ))}
              </Select>
            )
          }}
        />
        {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
      </Box>
    </>
  )
}

export default FormDropDown
