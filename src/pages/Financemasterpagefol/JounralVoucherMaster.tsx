// JounralVoucherMaster.tsx
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import JounralVoucherNav from './jounralvoucher/JounralVoucherNav';
import JounralVoucherSidebar from './jounralvoucher/JounralVoucherSidebar';
import AddJounralVoucher from './jounralvoucher/AddJounralVoucher';
import AddJounralTransactionH from './jounralvoucher/AddJounralTransactionH';

interface JounralAccount {
  name: string;
  ifscCode: string;
  amount: string;
}

function JounralVoucherMaster() {
  const [jounralAccount, setJounralAccount] = useState<JounralAccount[]>([]);
  const [selectedJounralAccount, setSelectedJounralAccount] = useState<JounralAccount | undefined>(undefined);

  useEffect(() => {
    const storedJounralAccounts = localStorage.getItem('jounralAccount');
    if (storedJounralAccounts) {
      setJounralAccount(JSON.parse(storedJounralAccounts));
    }
  }, []);

  const handleAddJounralAccount = (formData: JounralAccount) => {
    if (selectedJounralAccount) {
      const updatedAccounts = jounralAccount.map((account) =>
        account === selectedJounralAccount ? formData : account
      );
      setJounralAccount(updatedAccounts);
      localStorage.setItem('jounralAccount', JSON.stringify(updatedAccounts));
    } else {
      const updatedAccounts = [...jounralAccount, formData];
      setJounralAccount(updatedAccounts);
      localStorage.setItem('jounralAccount', JSON.stringify(updatedAccounts));
    }

    setSelectedJounralAccount(undefined);
  };

  const handleEditClick = (clickedJounralAccount: JounralAccount) => {
    setSelectedJounralAccount(clickedJounralAccount);
  };

  return (
    <Stack>
      <JounralVoucherNav />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <JounralVoucherSidebar jounralAccount={jounralAccount} onEditClick={handleEditClick} />
        <Stack spacing={2}>
          <AddJounralVoucher
            onAddJounralAccount={handleAddJounralAccount}
            selectedJounralAccount={selectedJounralAccount}
          />
          <AddJounralTransactionH />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default JounralVoucherMaster;
