// AddBankAccount.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';

interface AddBankAccountProps {
  onAddBankAccount: (formData: {
    bankAccountName: string;
    ifscCode: string;
    accountNumber: string;
    contactNumber: string;
    opningBalance: string;
    bankName: string;
  }) => void;
  selectedBankAccount?: {
    bankAccountName: string;
    ifscCode: string;
    accountNumber: string;
    contactNumber: string;
    opningBalance: string;
    bankName: string;
  };
}

function AddBankAccount({ onAddBankAccount, selectedBankAccount }: AddBankAccountProps) {
  const defaultBankAccountName = 'HDFC Bank';
  const defaultBankName = 'John Doe';

  const [bankAccountName, setBankAccountName] = useState<string>(
    selectedBankAccount?.bankAccountName || defaultBankAccountName
  );
  const [bankName, setBankName] = useState<string>(
    selectedBankAccount?.bankName || defaultBankName
  );
  const [ifscCode, setIfscCode] = useState<string>(selectedBankAccount?.ifscCode || 'HDFC0060000');
  const [opningBalance, setOpningBalance] = useState<string>(
    selectedBankAccount?.opningBalance || '500,000'
  );
  const [accountNumber, setAccountNumber] = useState<string>(
    selectedBankAccount?.accountNumber || '365-374-4961'
  );
  const [contactNumber, setContactNumber] = useState<string>(
    selectedBankAccount?.contactNumber || '365-374-4961'
  );

  const handleIFSCCode = (event: { target: { value: string } }) => {
    const formattedIFSCCode = event.target.value.toUpperCase();
    setIfscCode(formattedIFSCCode);
  };

  const handleOpningBalance = (event: { target: { value: string } }) => {
    const formattedBalance = event.target.value.replace(/,/g, '').replace(/\D/g, '');
    const formattedValue = formattedBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setOpningBalance(formattedValue);
  };

  const handleAccountNumber = (event: { target: { value: string } }) => {
    const formattedAccountNumber = event.target.value.replace(/[-\s]/g, '').replace(/\D/g, '');
    const formattedValue = formattedAccountNumber.match(/.{1,4}/g)?.join('-') || '';
    setAccountNumber(formattedValue);
  };

  const handleContactNumber = (event: { target: { value: string } }) => {
    const formattedContactNumber = event.target.value.replace(/[-\s]/g, '').replace(/\D/g, '');
    const formattedValue = formattedContactNumber.match(/.{1,4}/g)?.join('-') || '';
    setContactNumber(formattedValue);
  };

  const handleAddClick = () => {
    const formData = {
      bankAccountName,
      ifscCode,
      accountNumber,
      contactNumber,
      opningBalance,
      bankName,
    };

    onAddBankAccount(formData);

    // Clear the form fields after adding or editing the bank account
    setBankAccountName('HDFC Bank');
    setIfscCode('HDFC0060000');
    setOpningBalance('500,000');
    setAccountNumber('365-374-4961');
    setContactNumber('365-374-4961');
    setBankName('John Doe');
  };

  const handleClearClick = () => {
    setBankAccountName('');
    setIfscCode('');
    setOpningBalance('');
    setAccountNumber('');
    setContactNumber('');
    setBankName('');
  };

  useEffect(() => {
    // Update form fields with selected bank account data
    if (selectedBankAccount) {
      setBankAccountName(selectedBankAccount.bankAccountName || 'John Doe');
      setBankName(selectedBankAccount.bankName || 'HDFC Bank');
      setIfscCode(selectedBankAccount.ifscCode || 'HDFC0060000');
      setOpningBalance(selectedBankAccount.opningBalance || '500,000');
      setAccountNumber(selectedBankAccount.accountNumber || '365-374-4961');
      setContactNumber(selectedBankAccount.contactNumber || '365-374-4961');
    }
  }, [selectedBankAccount]);

  return (
    <Stack
      sx={{
        width: '860px',
        '@media (max-width: 600px)': {
          width: '100%',
          margin: '0 auto',
        },
        boxShadow: 3,
        padding: '20px',
      }}
      spacing={3}
    >
      <Typography  variant="h5" marginLeft="20px" sx={{ margin: '10px', color:'#a7b1bc' }}>
        {selectedBankAccount ? 'Edit Bank Account' : 'Add Bank Account'}
      </Typography>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <TextField
            id="outlined-basic"
            label="Bank Account Name"
            variant="outlined"
            value={bankAccountName}
            onChange={(event) => setBankAccountName(event.target.value)}
            sx={{
              width: '100%',
            }}
          />
          <TextField
            id="outlined-basic"
            label="IFSC Code"
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
            label="Account Number"
            variant="outlined"
            defaultValue="365-374-4961"
            value={accountNumber}
            onChange={handleAccountNumber}
            sx={{
              width: '100%',
            }}
          />
          <TextField
            id="outlined-basic"
            label="Bank Account Number"
            variant="outlined"
            value={contactNumber}
            onChange={handleContactNumber}
            sx={{
              width: '100%',
            }}
          />
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <TextField
            id="outlined-basic"
            label="Account Holder Name"
            variant="outlined"
            value={bankName}
            onChange={(event) => setBankName(event.target.value)}
            sx={{
              width: '100%',
            }}
          />
          <TextField
            id="outlined-basic"
            label="Opening Balance"
            variant="outlined"
            defaultValue="10,000,000"
            value={opningBalance}
            onChange={handleOpningBalance}
            sx={{
              width: '100%',
            }}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', marginRight: '40px' }}>
        <Button style={{ backgroundColor: '#DFE3E8', color: 'black', width: '100px' }} onClick={handleClearClick}>Clear</Button>
        <Button variant="contained" sx={{ width: '100px' }} onClick={handleAddClick}>
          {selectedBankAccount ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </Stack>
  );
}

AddBankAccount.propTypes = {
  onAddBankAccount: PropTypes.func.isRequired,
};

export default AddBankAccount;
