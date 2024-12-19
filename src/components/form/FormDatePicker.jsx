// React Imports
import React, { useEffect, useState } from 'react'

// Third-party Imports
import { Controller } from 'react-hook-form'

// MUI Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import CustomTextField from '@/@core/components/mui/TextField'
import { IconButton, InputAdornment } from '@mui/material'
import moment from 'moment'

export default function FormDatePicker({
  name,
  control,
  label,
  errors,
  disabled,
  required,
  disablePast,
  format,
  views,
  disableOtherYears,
  InputProps,
  placeholder = '',
  yearOnly = false,
  minDate = null,
  onChangeCallBack,
  isCloseIcon = true,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false)

  const currentYear = moment().year()
  const maxDate = new Date(currentYear + 100, 11, 31)

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { value, onChange } }) => (
        <AppReactDatepicker
          {...rest}
          fullWidth
          selected={value}
          dateFormat={yearOnly ? 'yyyy' : (format ?? 'dd/MM/yyyy')}
          showYearDropdown
          shouldCloseOnSelect
          minDate={minDate}
          maxDate={maxDate}
          showYearPicker={yearOnly}
          filterDate={date => {
            return minDate ? date >= minDate : true
          }}
          onChange={date => {
            onChangeCallBack?.(date)
            if (date) {
              // Create a new Date object using local time components
              const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
              onChange(adjustedDate)
            } else {
              onChange(null)
            }
            if (yearOnly) setIsOpen(false)
          }}
          onInputClick={() => {
            if (yearOnly) setIsOpen(true)
          }}
          open={yearOnly ? isOpen : undefined}
          onClickOutside={() => {
            if (yearOnly) setIsOpen(false)
          }}
          placeholderText={placeholder}
          customInput={
            <CustomTextField
              fullWidth
              label={label}
              placeholder={yearOnly ? 'YYYY' : 'MM-DD-YYYY'}
              InputProps={{
                ...InputProps,
                fullWidth: true,
                readOnly: yearOnly,
                autocomplete: 'off',
                endAdornment: value && isCloseIcon && !InputProps?.disabled && (
                  <InputAdornment
                    position='end'
                    sx={{
                      position: 'absolute',
                      right: 17
                    }}
                  >
                    <IconButton
                      onClick={e => {
                        e.stopPropagation()
                        onChange(null)
                      }}
                      edge='end'
                    >
                      <i className='tabler-x' />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={errors}
              helperText={errors?.message}
              sx={{
                cursor: 'pointer'
              }}
            />
          }
        />
      )}
    />
  )
}
