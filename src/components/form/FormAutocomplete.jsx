'use client'

import { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Autocomplete, TextField, Box, Typography, FormHelperText, InputAdornment, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const FormAutocomplete = ({
  name,
  control,
  label,
  error,
  options,
  required,
  placeholder,
  autocompleteProps,
  onChangeCallback,
  addIcon = false,
  addIconOnClick,
  isDisableAddIcon = false,
  isFormOpen
}) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  // Close the options list when isFormOpen becomes true
  useEffect(() => {
    if (isFormOpen) {
      setOpen(false)
    }
  }, [isFormOpen])

  return (
    <Box display={'flex'} flexDirection={'column'} gap={label ? '6px' : '0px'} width={addIcon ? '100%' : 'auto'}>
      <Typography
        variant='body2'
        color={error ? 'error.main' : theme.palette.text.primary}
        component='label'
        sx={{ fontSize: 14, lineHeight: '14px' }}
      >
        {label} {required ? '*' : ''}
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={{ required: required === undefined ? true : required }}
        render={({ field: { value, onChange, ...field } }) => (
          <Autocomplete
            {...field}
            open={open}
            onOpen={() => !isFormOpen && setOpen(true)}
            onClose={() => setOpen(false)}
            value={value ? options?.find(option => option.value === value) || null : null}
            onChange={(_event, newValue) => {
              const newValueId = newValue?.value ?? null
              onChange(newValueId)
              onChangeCallback?.(newValueId)
            }}
            options={options || []}
            getOptionLabel={option => option.name || ''}
            isOptionEqualToValue={(option, value) => option.value === value}
            renderInput={params => (
              <TextField
                {...params}
                error={Boolean(error)}
                placeholder={placeholder}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      {addIcon && (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => {
                              if (addIcon) {
                                addIconOnClick?.()
                              }
                            }}
                            disabled={isDisableAddIcon}
                            variant='contained'
                          >
                            <i className='tabler-plus text-textSecondary' />
                          </IconButton>
                        </InputAdornment>
                      )}
                    </>
                  )
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
            sx={{
              '& .MuiOutlinedInput-root': {
                py: 0,
                backgroundColor: autocompleteProps?.disabled ? theme.palette.FilledInput.disabledBg : 'background.paper'
              }
            }}
            {...autocompleteProps}
          />
        )}
      />
      {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
    </Box>
  )
}

export default FormAutocomplete
