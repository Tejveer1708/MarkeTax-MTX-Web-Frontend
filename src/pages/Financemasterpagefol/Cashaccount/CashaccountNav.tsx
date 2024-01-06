import React from 'react';
// @mui
import {
  Container,
  Stack,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

function CashaccountNav() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Cash Account"
            links={[
              {
                name: 'Finance Master',
                href: PATH_DASHBOARD.root,
              },
              {
                name: 'Cash Account',
                href: PATH_DASHBOARD.financemaster.cashaccount,
              },
            ]}
          />
        </Container>
      </Stack>
    </>
  );
}

export default CashaccountNav;
