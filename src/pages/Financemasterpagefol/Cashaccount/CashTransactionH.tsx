import React, { useState } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Divider from '@mui/material/Divider';

interface Row {
  name: string | React.ReactElement;
  bill1: string;
  bill2: string;
  bill3: string;
  bill4: string;
  bill5: string;
  bill6: string;
  bill7: string;
}

function createData(
  name: string | React.ReactElement,
  bill1: string,
  bill2: string,
  bill3: string,
  bill4: string,
  bill5: string,
  bill6: string,
  bill7: string
): Row {
  return { name, bill1, bill2, bill3, bill4, bill5, bill6, bill7 };
}

const initialRows: Row[] = [
  createData('INV-1990', '08 Sep, 23', 'Payment In', 'Test', 'Cash', '-', '$16.68', '$33.36'),
  createData(
    'INV-1991',
    '08 Sep, 23',
    'Payment Out',
    'Cash Sale',
    'Online',
    '$16.68',
    '-',
    '$16.68'
  ),
  createData(
    'INV-1992',
    '08 Sep, 23',
    'Payment In',
    'Shree Textiles',
    'Bank',
    '-',
    '$16.68',
    '$33.36'
  ),
  createData('INV-1993', '08 Sep, 23', 'Payment In', 'Test', 'Cash', '-', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', 'Payment Out', 'Test', 'Online', '$16.68', '-', '$0'),
  createData('INV-1993', '08 Sep, 23', 'Add Money', 'Test', ' Bank', '-', '$16.68', '$16.68'),
];

const allRows: Row[] = [
  ...initialRows,
  createData('INV-1993', '08 Sep, 23', 'Add Money', 'Test', ' Bank', '-', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', 'Add Money', 'Test', ' Bank', '-', '$16.68', '$16.68'),
];

function CashTransactionH() {
  const [showMore, setShowMore] = useState(false);
  const rowsToShow = showMore ? allRows : initialRows;
  return (
    <Stack
      sx={{
        width: '875px',
        '@media (max-width: 600px)': {
          width: '100%',
          margin: '0 auto',
        },
        boxShadow: 3,
        padding: '20px',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        Invoice History
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">TXN No.</TableCell>
              <TableCell align="left">Bill Date</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Party</TableCell>
              <TableCell align="left">Mode</TableCell>
              <TableCell align="left">Paid</TableCell>
              <TableCell align="left">Recieved</TableCell>
              <TableCell align="left">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToShow.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="left">
                    {row.name}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {row.bill1}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {row.bill2}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {row.bill3}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {row.bill4}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {row.bill5}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {row.bill6}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {row.bill7}
                  </TableCell>
                </TableRow>
                {index === allRows.length - 1 && showMore && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Divider sx={{ border: '1px dashed #919EAB33' }} />
                    </TableCell>
                  </TableRow>
                )}
                {index === 5 && !showMore && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Divider sx={{ border: '1px dashed #919EAB33' }} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                {!showMore && (
                  <Button
                    startIcon={<ExpandMoreIcon />}
                    style={{ color: 'black' }}
                    onClick={() => setShowMore(true)}
                  >
                    show more
                  </Button>
                )}
                {showMore && (
                  <Button
                    startIcon={<ExpandLessIcon />}
                    style={{ color: 'black' }}
                    onClick={() => setShowMore(false)}
                  >
                    show less
                  </Button>
                )}
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>$33.36</TableCell>
              <TableCell>$66.67</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default CashTransactionH;
