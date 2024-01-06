import { useState } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button, MenuItem } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// _mock
import { _invoiceAddressFrom } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
//
import InvoiceAddressListDialog from './InvoiceAddressListDialog';

import { RHFCheckbox, RHFSelect, RHFTextField } from '../../../components/hook-form';
import TransportDetailsDialog from './TransportDetailsDialog';


// ----------------------------------------------------------------------

const PAYMENT_TYPE_OPTIONS = [
  { id: 1, name: 'full credit' },
  { id: 2, name: 'credit' },
];

const STATION_OPTIONS = [
  { id: 1, name: 'Out Station' },
  { id: 3, name: 'In Station' },
];

export default function PurchaseMasterEditAddress() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { invoiceFrom, invoiceTo } = values;

  const [openFrom, setOpenFrom] = useState(false);

  const [opneTForm, setOpenTForm] = useState(false);

  // const [openTo, setOpenTo] = useState(false);

  const handleOpenFrom = () => {
    setOpenFrom(true);
  };

  const handleOpenTForm = () => {
    setOpenTForm(true);
  };

  const handleCloseTForm = () => {
    setOpenTForm(false);
  }

  const handleCloseFrom = () => {
    setOpenFrom(false);
  };

  // const handleOpenTo = () => {
  //   setOpenTo(true);
  // };

  // const handleCloseTo = () => {
  //   setOpenTo(false);
  // };

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography style={{ fontWeight: ' bold' }} sx={{ color: 'text.disabled' }}>
            Client Details
          </Typography>

          <Button
            size="small"
            sx={{color: '#4B49AC'}}
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={handleOpenFrom}
          >
            Change
          </Button>

          <InvoiceAddressListDialog
            open={openFrom}
            onClose={handleCloseFrom}
            selected={(selectedId: string) => invoiceFrom?.id === selectedId}
            onSelect={(address) => setValue('invoiceFrom', address)}
            addressOptions={_invoiceAddressFrom}
          />
        </Stack>
        <AddressInfo
          name={invoiceFrom.name}
          address={invoiceFrom.address}
          phone={invoiceFrom.phone}
        />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography style={{ fontWeight: ' bold' }} sx={{ color: 'text.disabled' }}>
            Shipping Address
          </Typography>
          <Button
            size="small"
            sx={{color: '#4B49AC'}}
            startIcon={<Iconify icon="material-symbols:add" />}
            onClick={handleOpenTForm}
            style={{
              fontSize: '11px'
            }}
          >
            Add Transporter details
          </Button>
          <TransportDetailsDialog
            open={opneTForm}
            onClose={handleCloseTForm} />
        </Stack>
        <RHFTextField
          size="small"
          name="address"
          label="Address"
          placeholder="Credit"
        // sx={{ maxWidth: { md: 150 } }}
        />
        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
          paddingTop={2}
        >
          <RHFSelect
            name="city"
            size="small"
            label="City"
            InputLabelProps={{ shrink: true }}
            sx={{ maxWidth: { md: 160 } }}
          >
            <MenuItem
              value=""
              // onClick={() => handleClearService(index)}
              sx={{ fontStyle: 'italic', color: 'text.secondary' }}
            >
              None
            </MenuItem>

            <Divider />

            {PAYMENT_TYPE_OPTIONS.map((option) => (
              <MenuItem
                key={option.id}
                value={option.name}
              // onClick={() => handleSelectService(index, service.name)}
              >
                {option.name}
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFSelect
            name="state"
            size="small"
            label="State"
            InputLabelProps={{ shrink: true }}
            sx={{ maxWidth: { md: 160 } }}
          >
            <MenuItem
              value=""
              // onClick={() => handleClearService(index)}
              sx={{ fontStyle: 'italic', color: 'text.secondary' }}
            >
              None
            </MenuItem>

            <Divider />

            {STATION_OPTIONS.map((option) => (
              <MenuItem
                key={option.id}
                value={option.name}
              // onClick={() => handleSelectService(index, service.name)}
              >
                {option.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
        <RHFCheckbox
          name="sameAsBilling"
          label="Same as Client Address"
          sx={{
            '& .Mui-checked': {
              color: '#4B49AC !important'
            }
          }}
        />
      </Stack>

      <Stack sx={{ width: 1 }} >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography style={{ fontWeight: ' bold' }} sx={{ color: 'text.disabled' }}>
            Payment Details
          </Typography>
        </Stack>

        {/* <Grid container spacing={2}>
            <Grid item xs={12}> */}
        <RHFTextField
          size="small"
          name="invoiceNumber"
          label="Invoice Number"
          placeholder="123456"
          sx={{ maxWidth: { md: 150 } }}
        />

        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
          paddingTop={2}
        >
          <RHFSelect
            name="paymentType"
            size="small"
            label="Payment Type"
            InputLabelProps={{ shrink: true }}
            sx={{ maxWidth: { md: 160 } }}
          >
            <MenuItem
              value=""
              // onClick={() => handleClearService(index)}
              sx={{ fontStyle: 'italic', color: 'text.secondary' }}
            >
              None
            </MenuItem>

            <Divider />

            {PAYMENT_TYPE_OPTIONS.map((option) => (
              <MenuItem
                key={option.id}
                value={option.name}
              // onClick={() => handleSelectService(index, service.name)}
              >
                {option.name}
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFSelect
            name="station"
            size="small"
            label="Station"
            InputLabelProps={{ shrink: true }}
            sx={{ maxWidth: { md: 160 } }}
          >
            <MenuItem
              value=""
              // onClick={() => handleClearService(index)}
              sx={{ fontStyle: 'italic', color: 'text.secondary' }}
            >
              None
            </MenuItem>

            <Divider />

            {STATION_OPTIONS.map((option) => (
              <MenuItem
                key={option.id}
                value={option.name}
              // onClick={() => handleSelectService(index, service.name)}
              >
                {option.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
        {/* 
            </Grid>
          </Grid> */}
        {invoiceTo ? (
          <AddressInfo name={invoiceTo.name} address={invoiceTo.address} phone={invoiceTo.phone} />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {(errors.invoiceTo as any)?.message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type AddressInfoProps = {
  name: string;
  address: string;
  phone: string;
};

function AddressInfo({ name, address, phone }: AddressInfoProps) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {address}
      </Typography>
      <Typography variant="body2">Phone: {phone}</Typography>
    </>
  );
}
