// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField } from '@mui/material';
// components
import {  RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function PurchaseMasterVoucherDate() {
  const { control, watch } = useFormContext();

  const values = watch();

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <RHFTextField
        disabled
        name="invoiceNumber"
        label="Voucher name"
        value={`V-${values.invoiceNumber}`}
      />

      {/* <RHFSelect fullWidth name="status" label="Status" InputLabelProps={{ shrink: true }}>
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect> */}

      <Controller
        name="createDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Date create"
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
          />
        )}
      />

      <RHFTextField
        disabled
        name="creditDays"
        label="Credit Days"
        // value={`V-${values.invoiceNumber}`}
      />
      <Controller
        name="dueDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Due date"
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
          />
        )}
      />
    </Stack>
  );
}
