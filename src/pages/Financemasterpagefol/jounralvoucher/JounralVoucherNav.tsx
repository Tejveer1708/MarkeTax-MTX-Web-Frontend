import React, { useState, ChangeEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
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

function JounralVoucherNav() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Jounral Voucher"
            links={[
              {
                name: 'Finance Master',
                href: PATH_DASHBOARD.root,
              },
              {
                name: 'Journal Voucher',
                href: PATH_DASHBOARD.financemaster.journalvoucher,
              },
            ]}
          />
        </Container>
      </Stack>
    </>
  );
}

export default JounralVoucherNav;
