import React, { useState } from 'react';
import { Stack, Typography, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Row {
  name: string | React.ReactElement;
  bill1: string;
  bill2: string;
  bill3: string;
  bill4: string;
}

function createData(
  name: string | React.ReactElement,
  bill1: string,
  bill2: string,
  bill3: string,
  bill4: string
): Row {
  return { name, bill1, bill2, bill3, bill4 };
}

const rows: Row[] = [
  createData('INV-1990', '500000', '500000', '500000', '500000'),
  createData('INV-1990', '500000', '500000', '500000', '500000'),
  createData('INV-1990', '500000', '500000', '500000', '500000'),
  createData('INV-1990', '500000', '500000', '500000', '500000'),
  createData('', '', '2500000', '2500000', '2500000'),
];

function FinanceDataform() {
  const [billAmount, setBillAmount] = useState('500,000');
  const [enterAmount, setEnterAmount] = useState('10,000');
  const [balanceAmount, setBalanceAmount] = useState('10,000');
  const [vatavAmount, setVatavAmount] = useState<string>('98');

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const formattedValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };

  return (
    <Stack
      sx={{
        boxShadow: 3,
        padding:'20px',
      }}
    >
      <Typography variant="h5" marginLeft="20px" sx={{ margin: '10px' }}>
        Bill Adjustment Details
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Stack
          spacing={2}
          sx={{
            width: '250px',
            margin: '10px',
            '@media (max-width: 600px)': {
              width: '100%',
              margin: '0 auto',
            },
          }}
        >
          <Stack direction="row" spacing={2} sx={{
              width: '250px',
            }}>
            <TextField
              id="outlined-basic"
              label="Bill No. "
              variant="outlined"
              defaultValue='500000'
            />
            <TextField
              id="outlined-basic"
              label="Bill Amount"
              variant="outlined"
              value={billAmount}
              onChange={(e) => handleInputChange(e.target.value, setBillAmount)}
            />
          </Stack>
          <Stack spacing={2} sx={{
              width: '250px',
            }}>
            <TextField
              id="outlined-basic"
              label="Enter Amount"
              variant="outlined"
              value={enterAmount}
              onChange={(e) => handleInputChange(e.target.value, setEnterAmount)}
            />
            <TextField
              id="outlined-basic"
              label="Balance Amount"
              variant="outlined"
              value={balanceAmount}
              onChange={(e) => handleInputChange(e.target.value, setBalanceAmount)}
            />
          </Stack>
          <Stack
            spacing={2}
            sx={{
              width: '200px',
            }}
          >
            <TextField
              id="outlined-basic"
              label="Vatav Amount (+ / - )"
              variant="outlined"
              value={vatavAmount}
              onChange={(e) => handleInputChange(e.target.value, setVatavAmount)}
            />
          </Stack>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack>
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              '@media (min-width: 1100px)': {
                marginLeft: '150px',
                marginTop: '-40px',
              },
            }}
          >
            <Stack
              sx={{
                width: '250px',
                margin: '10px',
                backgroundColor: '#F4F6F8',
                borderRadius: '30px',
              }}
              direction="row"
            >
              <Stack sx={{ alignItems: 'flex-end' }} style={{ padding: '20px' }}>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Typography>Cheque</Typography>
                  <Typography>10000.00</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Typography>Adj. Amount</Typography>
                  <Typography>10000.00</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Typography>Balance</Typography>
                  <Typography>10000.00</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: '475px',
              padding:'10px',
              '@media (max-width: 600px)': {
                width: '100%',
                margin: '0 auto',
              },
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400,
              '@media (max-width: 600px)': {
                minWidth: 500,
              }, }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{marginRight:'20px'}}>Bill No.</TableCell>
                    <TableCell align="left">Bill Amt</TableCell>
                    <TableCell align="left">Adj. Amt</TableCell>
                    <TableCell align="left">Bal. Amt</TableCell>
                    <TableCell align="left">Vat. Amt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <React.Fragment key={index}>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.bill1}</TableCell>
                        <TableCell align="left">{row.bill2}</TableCell>
                        <TableCell align="left">{row.bill3}</TableCell>
                        <TableCell align="left">{row.bill4}</TableCell>
                      </TableRow>
                      {index === 3 && (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Divider sx={{ border: '1px dashed #919EAB33' }} />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default FinanceDataform;
