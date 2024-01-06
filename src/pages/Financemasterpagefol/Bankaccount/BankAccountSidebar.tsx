// BankAccountSidebar.tsx
import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Divider from '@mui/material/Divider';

import bankicon from '../icons/image 1.svg';

interface BankAccount {
  bankAccountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  contactNumber: string;
  opningBalance: string;
}

interface BankAccountSidebarProps {
  bankAccounts: BankAccount[];
  onEditClick: (selectedBankAccount: BankAccount) => void;
}

export default function BankAccountSidebar({ bankAccounts, onEditClick }: BankAccountSidebarProps) {
  return (
    <Stack
      sx={{
        width: '450px',
        height: '700px',
        margin: '10px',
        padding: '20px',
        '@media (max-width: 600px)': {
          width: '100%',
          height: '100%',
          margin: '0 auto',
        },
        '@media (min-width: 600px)': {
          margin: '0 auto',
          height: '100%',
        },
      }}
      boxShadow={3}
      spacing={3}
    >
      <Typography variant="h4" sx={{ color: '#a7b1bc' }}>
        Bank Account
      </Typography>
      <Stack alignItems={{ xs: 'center', md: 'flex-start' }}>
        <Stack direction="row" spacing={2}>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            {bankAccounts.map((account, index) => (
              <Stack key={index}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  onClick={() => onEditClick(account)}
                  sx={{ cursor: 'pointer' }}
                >
                  <img width="32px" height="32px" src={bankicon} alt="icon" />
                  <Stack>
                    <Typography>{account.bankName}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography>{account.bankAccountName}</Typography>
                      <FiberManualRecordIcon sx={{ fontSize: 'small' }} color="disabled" />
                      <Typography>{account.accountNumber}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Divider sx={{ border: '1px dashed #919EAB33', marginTop: '30px' }} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
