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

const initialRows: Row[] = [
  createData('INV-1990', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1991', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1992', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
];

const allRows: Row[] = [
  ...initialRows,
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
  createData('INV-1993', '08 Sep, 23', '$16.68', '$16.68', '$16.68'),
];

function FinanceMasterInvoise(): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const rowsToShow = showMore ? allRows : initialRows;

  return (
    <Stack
      sx={{
        boxShadow: 3,
        padding: '20px',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        Invoice History
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Bill Number </TableCell>
              <TableCell align="right">Bill Date</TableCell>
              <TableCell align="right">Bill Amount</TableCell>
              <TableCell align="right">Adjusted Amount</TableCell>
              <TableCell align="right">Balance Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToShow.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.bill1}</TableCell>
                  <TableCell align="right">{row.bill2}</TableCell>
                  <TableCell align="right">{row.bill3}</TableCell>
                  <TableCell align="right">{row.bill4}</TableCell>
                </TableRow>
                {index === 4 && !showMore && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Divider sx={{ border: '1px dashed #919EAB33' }} />
                    </TableCell>
                  </TableRow>
                )}
                {index === allRows.length - 1 && showMore && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Divider sx={{ border: '1px dashed #919EAB33' }} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell align="right">
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
              <TableCell align="right" />
              <TableCell align="right">$100.08</TableCell>
              <TableCell align="right">$100.08</TableCell>
              <TableCell align="right">$100.08</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default FinanceMasterInvoise;
