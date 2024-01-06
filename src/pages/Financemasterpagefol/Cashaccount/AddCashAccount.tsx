import React, { useState, useEffect } from 'react';
import { Stack, Typography, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

interface AddCashAccountProps {
  onAddCashAccount: (formData: {
    cashName: string;
    openingBalance: string;
    closingBalance: string;
    // ... other properties
  }) => void;
  selectedCashAccount?: {
    cashName: string;
    openingBalance: string;
    closingBalance: string;
    // ... other properties
  };
}

function AddCashAccount({ onAddCashAccount, selectedCashAccount }: AddCashAccountProps) {
  const [cashName, setCashName] = useState<string>(selectedCashAccount?.cashName || 'John Doe');
  const [openingBalance, setOpeningBalance] = useState<string>(
    selectedCashAccount?.openingBalance || '500,000'
  );
  const [closingBalance, setClosingBalance] = useState<string>(
    selectedCashAccount?.closingBalance || '600,000'
  );

  const handleOpeningBalance = (event: { target: { value: string } }) => {
    const formattedValue = event.target.value.replace(/,/g, '').replace(/\D/g, '');
    setOpeningBalance(formattedValue);
  };

  const handleClosingBalance = (event: { target: { value: string } }) => {
    const formattedValue = event.target.value.replace(/,/g, '').replace(/\D/g, '');
    setClosingBalance(formattedValue);
  };

  const handleAddClick = () => {
    const formData = {
      cashName,
      openingBalance,
      closingBalance,
    };

    onAddCashAccount(formData);
    setCashName('John Doe');
    setOpeningBalance('500,000');
    setClosingBalance('600,000');
  };

  const handleClearClick = () => {
    setCashName('');
    setOpeningBalance('');
    setClosingBalance('');
  };

  useEffect(() => {
    // Update form fields with selected cash account data
    if (selectedCashAccount) {
      setCashName(selectedCashAccount.cashName || 'John Doe');
      setOpeningBalance(selectedCashAccount.openingBalance || '500,000');
      setClosingBalance(selectedCashAccount.closingBalance || '500,000');
      // Update other fields if needed
    }
  }, [selectedCashAccount]);

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
      <Typography variant="h5">Add Cash Account</Typography>
      <Stack spacing={3}>
        <TextField
          id="outlined-basic"
          label="Cash Account Name"
          variant="outlined"
          value={cashName}
          onChange={(e) => setCashName(e.target.value)}
          sx={{
            width: '100%',
          }}
        />
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <TextField
          id="outlined-basic"
          label="Opening Balance"
          variant="outlined"
          value={openingBalance}
          onChange={handleOpeningBalance}
          sx={{
            width: '100%',
          }}
        />
        <TextField
          id="outlined-basic"
          label="Closing Balance"
          variant="outlined"
          value={closingBalance}
          onChange={handleClosingBalance}
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
          {selectedCashAccount ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </Stack>
  );
}

AddCashAccount.propTypes = {
  onAddCashAccount: PropTypes.func.isRequired,
};

export default AddCashAccount;
