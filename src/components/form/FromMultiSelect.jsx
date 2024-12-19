import { Box, FormHelperText, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import padding from 'tailwindcss-logical/plugins/padding'

const FormMultiSelect = ({
  name,
  control,
  label,
  options,
  placeholder = 'Select options',
  isDisabled = false,
  required = false,
  error
}) => {
  const theme = useTheme()

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? theme.palette.action.hover : theme.palette.background.paper,
      borderColor: state.isFocused ? theme.palette.secondary.lighterOpacity : theme.palette.customColors.inputBorder,
      borderRadius: '6px',
      boxShadow: state.isFocused ? `0 0 0 2px ${theme.palette.primary.main}` : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '' : theme.palette.action.active
      },
      padding: '2px 0px 2px 0px'
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      borderRadius: '8px',
      overflow: 'hidden'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.palette.primary.main
        : state.isFocused
          ? theme.palette.action.hover
          : 'transparent',
      color: state.isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
      '&:active': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }
    }),
    multiValue: provided => ({
      ...provided,
      backgroundColor: theme.palette.FilledInput.disabledBg,
      borderRadius: '7px'
    }),
    multiValueLabel: provided => ({
      ...provided,
      color: theme.palette.text.primary
    }),
    multiValueRemove: provided => ({
      ...provided,
      display: isDisabled ? 'none' : 'block',
      color: theme.palette.text.paper,
      '&:hover': {
        backgroundColor: theme.palette.secondary.mainOpacity,
        color: theme.palette.text.primary
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided
    }),
    input: provided => ({
      ...provided,
      color: theme.palette.text.primary
    }),
    placeholder: provided => ({
      ...provided,
      color: theme.palette.text.placeHolder
    })
  }

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? <i className='tabler-chevron-up' /> : <i className='tabler-chevron-down' />}
      </components.DropdownIndicator>
    )
  }

  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <Typography
        variant='body2'
        color={error ? 'error' : 'textPrimary'}
        component='label'
        sx={{ fontSize: 14, lineHeight: '14px' }}
      >
        {label} {required && '*'}
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti
            styles={customStyles}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.value}
            placeholder={placeholder}
            isDisabled={isDisabled}
            aria-label={label}
            components={{ DropdownIndicator }}
          />
        )}
      />
      {error && (
        <FormHelperText error sx={{ margin: 0 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  )
}

export default FormMultiSelect
