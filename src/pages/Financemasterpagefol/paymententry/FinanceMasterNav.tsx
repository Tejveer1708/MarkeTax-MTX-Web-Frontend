import React, { useState, ChangeEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
// @mui
import {
  Container,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

function FinanceMasterNav() {
  const { themeStretch } = useSettingsContext();
  const [openbank, setOpenbank] = useState(false);
  const [opencash, setOpencash] = useState(false);

  const handleClickopenbank = () => {
    setOpenbank(true);
  };

  const handleClosebank = () => {
    setOpenbank(false);
  };

  const handleClickopenCash = () => {
    setOpencash(true);
  };

  const handleCloseCash = () => {
    setOpencash(false);
  };

  // opening balance comma
  const [opningBalance, setopningBalance] = useState<string>('500,000');
  const handleopningBalance = (event: { target: { value: string } }) => {
    // Remove existing commas from the input value
    const formattedBalance = event.target.value.replace(/,/g, '').replace(/\D/g, '');
    // Add commas every three digits from the right
    const formattedValue = formattedBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setopningBalance(formattedValue);
  };

  // closing balance comma
  const [closingBalance, setclosingBalance] = useState<string>('10,000,000');
  const handleclosingBalance = (event: { target: { value: string } }) => {
    // Remove existing commas from the input value
    const formattedBalance = event.target.value.replace(/,/g, '').replace(/\D/g, '');
    // Add commas every three digits from the right
    const formattedValue = formattedBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setclosingBalance(formattedValue);
  };


  // hyphen account number
  const [accountNumber, setaccountNumber] = useState<string>('365-374-4961');
  const handleAccountNumber = (event: { target: { value: string } }) => {
    // Remove existing hyphens and spaces from the input value
    const formattedAccountNumber = event.target.value.replace(/[-\s]/g, '').replace(/\D/g, '');
    // Insert hyphens every 4 digits
    const formattedValue = formattedAccountNumber.match(/.{1,4}/g)?.join('-') || '';
    setaccountNumber(formattedValue);
  };

  // contact number
  const [contactNumber, setcontactNumber] = useState<string>('365-374-4961');
  const handlecontactNumber = (event: { target: { value: string } }) => {
    // Remove existing hyphens and spaces from the input value
    const formattedContactNumber = event.target.value.replace(/[-\s]/g, '').replace(/\D/g, '');
    // Insert hyphens every 4 digits
    const formattedValue = formattedContactNumber.match(/.{1,4}/g)?.join('-') || '';
    setcontactNumber(formattedValue);
  };


  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Finance Master"
            links={[
              {
                name: 'Finance Master',
                href: PATH_DASHBOARD.root,
              },
              {
                name: 'Payment Entry',
                href: PATH_DASHBOARD.financemaster.paymententry,
              },
            ]}
          />
        </Container>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            pt: 3,
            px: 3,
            pb: 2,
            '@media (max-width: 600px)': {
              justifyContent: 'center',
            },
          }}
        >
          <Stack>
            <Button
              variant="outlined"
              style={{ width: '150px' }}
              startIcon={<AddIcon />}
              onClick={handleClickopenbank}
            >
              Bank Account
            </Button>
            <Dialog open={openbank} onClose={handleClosebank}>
              <DialogTitle>Add Bank Account</DialogTitle>
              <DialogContent>
                <Stack style={{ margin: 10, gap: 10 }}>
                  <Stack direction="row" spacing={3}>
                    <TextField
                      id="outlined-basic"
                      label="Bank Account Name"
                      variant="outlined"
                      defaultValue="Jayvion Simon"
                    />
                    <TextField
                      id="outlined-basic"
                      label="IFSC Code"
                      variant="outlined"
                      defaultValue="HDFC0060000"
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <TextField
                      id="outlined-basic"
                      label="Account Number"
                      variant="outlined"
                      defaultValue="365-374-4961"
                      value={accountNumber}
                      onChange={handleAccountNumber}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Bank Contact Number"
                      variant="outlined"
                      defaultValue="365-374-4961"
                      value={contactNumber}
                      onChange={handlecontactNumber}
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <TextField
                      id="outlined-basic"
                      label="Opening Balance"
                      variant="outlined"
                      value={opningBalance}
                      onChange={handleopningBalance}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Closing Balance"
                      variant="outlined"
                      defaultValue="10,000,000,"
                      value={closingBalance}
                      onChange={handleclosingBalance}
                    />
                  </Stack>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ backgroundColor: '#DFE3E8', color: 'black' }}
                  onClick={handleClosebank}
                >
                  Cancel
                </Button>
                <Button onClick={handleClosebank} variant="contained">
                  create
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
          <Stack>
            <Button
              variant="outlined"
              style={{ width: '150px' }}
              startIcon={<AddIcon />}
              onClick={handleClickopenCash}
            >
              Cash Account
            </Button>
            <Dialog open={opencash} onClose={handleCloseCash}>
              <DialogTitle>Add Cash Account</DialogTitle>
              <DialogContent>
                <Stack style={{ margin: 10, gap: 10 }}>
                  <TextField
                    id="outlined-basic"
                    label="Cash Account Name"
                    variant="outlined"
                    defaultValue="Jayvion Simon"
                  />
                  <Stack direction="row" spacing={3}>
                    <TextField
                      id="outlined-basic"
                      label="Opening Balance"
                      variant="outlined"
                      defaultValue="10,000,000,"
                      value={opningBalance}
                      onChange={handleopningBalance}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Closing Balance"
                      variant="outlined"
                      defaultValue="10,000,000,"
                      value={closingBalance}
                      onChange={handleclosingBalance}
                    />
                  </Stack>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ backgroundColor: '#DFE3E8', color: 'black' }}
                  onClick={handleCloseCash}
                >
                  Cancel
                </Button>
                <Button onClick={handleCloseCash} variant="contained">
                  create
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default FinanceMasterNav;
