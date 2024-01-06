import React from 'react';
import { Stack} from '@mui/material';
import FinanceMasterNav from './paymententry/FinanceMasterNav';
import FinanceMasterPaymentform from './paymententry/FinanceMasterPaymentform';
import FinanceDataform from './paymententry/FinanceDataform';
import FinanceMasterInvoise from './paymententry/FinanceMasterInvoise';

function FinaceMasterPage() {
  return (
    <>
      <FinanceMasterNav />
      <Stack 
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
      >
        <FinanceMasterPaymentform />
        <Stack spacing={2}>
          <FinanceDataform />
          <FinanceMasterInvoise />
        </Stack>
      </Stack>
    </>
  );
}

export default FinaceMasterPage;
