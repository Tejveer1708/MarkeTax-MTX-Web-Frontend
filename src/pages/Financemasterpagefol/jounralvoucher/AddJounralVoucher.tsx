import React, { useState } from 'react';
import { Stack, Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

interface AddJounralVoucherProps {
  onAddJounralAccount: (formData: {
    name: string;
    ifscCode: string;
    amount: string;
  }) => void;
  selectedJounralAccount?: {
    name: string;
    ifscCode: string;
    amount: string;
  };
}

function AddJounralVoucher({ onAddJounralAccount, selectedJounralAccount }: AddJounralVoucherProps) {
  // name
  const [name, setName] = useState<string>('Jayvion Simon');

  // ifsc code
  const [ifscCode, setIfscCode] = useState<string>('HDFC0060000');
  const handleIFSCCode = (event: { target: { value: string } }) => {
    const formattedIFSCCode = event.target.value.toUpperCase();
    setIfscCode(formattedIFSCCode);
  };

  // Amount with comma separation
  const [amount, setAmount] = useState<string>('500,000');
  const handleAmount = (event: { target: { value: string } }) => {
    const formattedBalance = event.target.value.replace(/,/g, '').replace(/\D/g, '');
    const formattedValue = formattedBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setAmount(formattedValue);
  };

  const handleAddClick = () => {
    const formData = {
      name,
      ifscCode,
      amount,
    };

    onAddJounralAccount(formData);
    setIfscCode('HDFC0060000');
    setAmount('500,000');
  };

  const handleClearClick = () => {
    setIfscCode('HDFC0060000');
    setAmount('500,000');
  };

  return (
    <Stack
      sx={{
        width: '875px',
        '@media (max-width: 600px)': {
          width: '100%',
          margin: '0 auto',
        },
        boxShadow: 3,
        padding: '20px',
      }}
      spacing={3}
    >
      <Typography variant="h5" marginLeft="20px" sx={{ margin: '10px' }}>
        Create Jounral Voucher
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <TextField
          id="outlined-basic"
          label="Debit Account"
          variant="outlined"
          defaultValue="Jayvion Simon"
          sx={{
            width: '100%',
          }}
        />
        <TextField
          id="outlined-basic"
          label="Credit account"
          variant="outlined"
          value={ifscCode}
          onChange={handleIFSCCode}
          sx={{
            width: '100%',
          }}
        />
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          value={amount}
          onChange={handleAmount}
          sx={{
            width: '100%',
          }}
        />
        <TextField
          label="Notes"
          multiline
          rows={6}
          maxRows={4}
          defaultValue="Lorem ipsum dolor"
          sx={{
            width: '100%',
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', marginRight: '40px' }}>
        <Button style={{ backgroundColor: '#DFE3E8', color: 'black', width: '100px' }} onClick={handleClearClick}>
          Clear
        </Button>
        <Button variant="contained" sx={{ width: '100px' }} onClick={handleAddClick}>
          {selectedJounralAccount ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </Stack>
  );
}

AddJounralVoucher.propTypes = {
  onAddJounralAccount: PropTypes.func.isRequired,
};

export default AddJounralVoucher;
