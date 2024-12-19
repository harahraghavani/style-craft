// React Imports
import React from 'react'

// Third-party Imports
import { Controller } from 'react-hook-form'

// MUI Imports
import { Switch, FormControlLabel, Box } from '@mui/material'

const FormSwitch = ({ control, name, value, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
          <FormControlLabel {...field} label={label} control={<Switch checked={field.value} {...field} />} />
        </Box>
      )}
    />
  )
}

export default FormSwitch
