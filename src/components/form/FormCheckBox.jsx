'use client'

// Third party imports
import { Controller } from 'react-hook-form'

// MUI Imports
import { FormHelperText, Checkbox } from '@mui/material'

const FormCheckBox = ({ control, name, value, error }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <Checkbox
            {...field}
            sx={{
              p: 0
            }}
          />
        )}
      />
      {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
    </>
  )
}

export default FormCheckBox
