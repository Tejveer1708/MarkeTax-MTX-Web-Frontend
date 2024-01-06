// BankAccountMaster.tsx
import React, { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import BankAccountNav from './Bankaccount/BankAccountNav';
import BankAccountSidebar from './Bankaccount/BankAccountSidebar';
import AddBankAccount from './Bankaccount/AddBankAccount';
import TransactionHistory from './Bankaccount/TransactionHistory';

interface BankAccount {
  ifscCode: string;
  accountNumber: string;
  contactNumber: string;
  opningBalance: string;
  bankAccountName: string;
  bankName: string;
}

function BankAccountMaster() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount | undefined>(undefined);

  useEffect(() => {
    const storedBankAccounts = localStorage.getItem('bankAccounts');
    if (storedBankAccounts) {
      setBankAccounts(JSON.parse(storedBankAccounts));
    }
  }, []);

  const handleAddBankAccount = (formData: BankAccount) => {
    if (selectedBankAccount) {
      // Update existing bank account
      const updatedAccounts = bankAccounts.map((account) =>
        account === selectedBankAccount ? formData : account
      );
      setBankAccounts(updatedAccounts);
    } else {
      // Add new bank account
      const updatedAccounts = [...bankAccounts, formData];
      setBankAccounts(updatedAccounts);
    }

    localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));
    setSelectedBankAccount(undefined); // Clear selected bank account after adding/editing
  };

  const handleClearAllBankAccounts = () => {
    setBankAccounts([]);
    localStorage.removeItem('bankAccounts');
    setSelectedBankAccount(undefined);
  };

  const handleEditClick = (clickedBankAccount: BankAccount) => {
    setSelectedBankAccount(clickedBankAccount);
  };

  return (
    <Stack>
      <BankAccountNav />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <BankAccountSidebar bankAccounts={bankAccounts} onEditClick={handleEditClick} />
        <Stack spacing={2}>
          <AddBankAccount onAddBankAccount={handleAddBankAccount} selectedBankAccount={selectedBankAccount} />
          <TransactionHistory />
          {/* <Button variant="contained" color="error" onClick={handleClearAllBankAccounts}>
            Clear All Bank Accounts
          </Button> */}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default BankAccountMaster;
