import React, { useState, useEffect } from 'react';
import { Stack , Button} from '@mui/material';
import CashaccountNav from './Cashaccount/CashaccountNav';
import CashAccountSidebar from './Cashaccount/CashAccountSidebar';
import AddCashAccount from './Cashaccount/AddCashAccount';
import CashTransactionH from './Cashaccount/CashTransactionH';

interface CashAccount {
  cashName: string;
    openingBalance: string;
    closingBalance: string;
}

function CashAccountMaster() {
  const [CashAccounts, setCashAccounts] = useState<CashAccount[]>([]);
  const [selectedCashAccount, setSelectedCashAccount] = useState<CashAccount | undefined>(
    undefined
  );

  useEffect(() => {
    const storedCashAccounts = localStorage.getItem('cashAccounts');
    if (storedCashAccounts) {
      setCashAccounts(JSON.parse(storedCashAccounts));
    }
  }, []);

  const handleAddCashAccount = (formData: CashAccount) => {
    if (selectedCashAccount) {
      // Update existing bank account
      const updatedAccounts = CashAccounts.map((account) =>
        account === selectedCashAccount ? formData : account
      );
      setCashAccounts(updatedAccounts);

      localStorage.setItem('cashAccounts', JSON.stringify(updatedAccounts));
    } else {
      // Add new bank account
      const updatedAccounts = [...CashAccounts, formData];
      setCashAccounts(updatedAccounts);

      localStorage.setItem('cashAccounts', JSON.stringify(updatedAccounts));
    }

    setSelectedCashAccount(undefined); // Clear selected bank account after adding/editing
  };

  const handleClearAllCashAccounts = () => {
    setCashAccounts([]);
    localStorage.removeItem('cashAccounts');
    setSelectedCashAccount(undefined);
  };

  const handleEditClick = (clickedBankAccount: CashAccount) => {
    setSelectedCashAccount(clickedBankAccount);
  };

  return (
    <Stack>
      <CashaccountNav />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <CashAccountSidebar cashAccounts={CashAccounts} onEditClick={handleEditClick} />
        <Stack spacing={2}>
          <AddCashAccount
            onAddCashAccount={handleAddCashAccount}
            selectedCashAccount={selectedCashAccount}
          />
          <CashTransactionH />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CashAccountMaster;
