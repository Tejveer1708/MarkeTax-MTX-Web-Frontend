// BankAccountSidebar.tsx
import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Divider from '@mui/material/Divider';

import bankicon from '../icons/image 1.svg';

interface jounralAccount {
  name: string;
  ifscCode: string;
  amount: string;
  
}

interface AddJounralVoucherProps {
  jounralAccount: jounralAccount[];
  onEditClick: (selectedJounralAccount: jounralAccount) => void;
}

export default function JounralVoucherSidebar({ jounralAccount, onEditClick }: AddJounralVoucherProps) {
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
        Jounral Voucher
      </Typography>
      <Stack alignItems={{ xs: 'center', md: 'flex-start' }}>
        <Stack direction="row" spacing={2}>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            {jounralAccount.map((account, index) => (
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
                    <Typography>{account.name}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography>{account.ifscCode}</Typography>
                      <FiberManualRecordIcon sx={{ fontSize: 'small' }} color="disabled" />
                      <Typography>{account.amount}</Typography>
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
