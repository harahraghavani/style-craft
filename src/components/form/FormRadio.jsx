'use client'

// Third party imports
import { Controller } from 'react-hook-form'

// MUI Imports
import { RadioGroup, FormControlLabel, Radio, FormLabel, FormHelperText } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const FormRadioGroup = ({ control, name, value, label, error }) => {
  const theme = useTheme()

  return (
    <>
      <FormLabel
        sx={{
          fontSize: 14,
          color: error ? theme.palette.error.main : theme.palette.text.primary
        }}
      >
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <RadioGroup row aria-label='controlled' {...field}>
            <FormControlLabel
              value='reader'
              control={<Radio />}
              label='I am a reader'
              sx={{
                '.MuiFormControlLabel-label': {
                  color: theme.palette.text.textLightColor
                }
              }}
            />
            <FormControlLabel
              value='author'
              control={<Radio />}
              label='I am an author'
              sx={{
                '.MuiFormControlLabel-label': {
                  color: theme.palette.text.textLightColor
                }
              }}
            />
          </RadioGroup>
        )}
      />
      {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
    </>
  )
}

export default FormRadioGroup
