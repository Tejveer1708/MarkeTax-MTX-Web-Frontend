import { SetStateAction, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Stack, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';

const paymenttype = [
  {
    value: 'recive',
    label: 'Amount Receivable',
  },
  {
    value: 'payable',
    label: 'Amount payable',
  },
];

const paymentmode = [
  {
    value: 'Cheque',
    label: 'Cheque',
  },
  {
    value: 'Cash',
    label: 'Cash',
  },
  {
    value: 'Online',
    label: 'Online',
  },
];

const bankaccount = [
  {
    value: 'bank1',
    label: 'HDFC Bank',
  },
  {
    value: 'bank2',
    label: 'ICICI Bank',
  },
  {
    value: 'bank3',
    label: 'SBI Bank',
  },
];
const partyaccount = [
  {
    value: 'party1',
    label: 'Sarees Pvt Ltd',
  },
  {
    value: 'party2',
    label: 'info pvt ltd',
  },
  {
    value: 'party3',
    label: 'reliance pvt ltd',
  },
];

export default function FinanceMasterPaymentform() {
  const [paymentDate, setPaymentDate] = useState<Date | null>(new Date());
  const onChangePaymentDate = (date: Date | null) => {
    setPaymentDate(date);
  };

  const [party, setParty] = useState<string>('party1');
  const [bankAcc, setBankacc] = useState<string>('bank1');

  const [paymentType, setPaymentType] = useState('recive');
  const [paymentMode, setPaymentMode] = useState('Cheque');
  const isCashPayment = paymentType === 'recive' && paymentMode === 'Cash';
  const isChequePayment = paymentMode === 'Cheque';


  const handlePaymentTypeChange = (event: { target: { value: SetStateAction<string> } }) => {
    setPaymentType(event.target.value);
  };

  const handlePaymentModeChange = (event: { target: { value: SetStateAction<string> } }) => {
    setPaymentMode(event.target.value);
  };

  // hyphen payment id and cheque number
  const [chequeNumber, setChequeNumber] = useState<string>('365-374-4961');
  const handleChequeNumberChange = (event: { target: { value: string } }) => {
    // Remove existing hyphens and spaces from the input value
    const formattedChequeNumber = event.target.value.replace(/[-\s]/g, '').replace(/\D/g, '');
    // Insert hyphens every 4 digits
    const formattedValue = formattedChequeNumber.match(/.{1,4}/g)?.join('-') || '';
    setChequeNumber(formattedValue);
  };

  // comma amount in the amount field
  const [amount, setAmount] = useState<string>('34554298');
  const handleAmountChange = (event: { target: { value: string } }) => {
    const formattedAmount = event.target.value.replace(/\D/g, '');
    const formattedValue = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setAmount(formattedValue);
  };


  // voucher
  const [voucher, setVoucher] = useState<string>('34554298');
  const handleVoucherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedVoucherNumber = event.target.value.replace(/\D/g, '');
    setVoucher(formattedVoucherNumber);
  };

  return (
    <>
      <form noValidate>
        <Stack
          sx={{
            width: '400px',
            height: '700px',
            margin: '10px',
            padding: '20px',
            '@media (max-width: 600px)': {
              width: '100%',
              margin: '0 auto',
            },
            '@media (min-width: 600px)': {
              margin: '0 auto',
            },
          }}
          boxShadow={3}
          spacing={2}
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Payment Type"
            defaultValue="recive"
          >
            {paymenttype.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={3}>
            <Stack style={{ width: '250px' }}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Payment Mode"
                value={paymentMode}
                onChange={handlePaymentModeChange}
                defaultValue="Cheque"
                SelectProps={{
                  native: true,
                }}
              >
                {paymentmode.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Stack>

            <Stack style={{ width: '250px' }}>
              <DatePicker
                label="Payment Date"
                value={paymentDate}
                onChange={onChangePaymentDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </Stack>
          <Autocomplete
        disablePortal
        id="Bank account"
        options={bankaccount}
        getOptionLabel={(option) => option.label}
        value={bankaccount.find((option) => option.value === bankAcc) || null}
        onChange={(event, newValue) => {
          setBankacc(newValue?.value || '');
        }}
        renderInput={(params) => <TextField {...params} label="Bank Account" />}
      />
          <Autocomplete
        disablePortal
        id="party-account"
        options={partyaccount}
        getOptionLabel={(option) => option.label}
        value={partyaccount.find((option) => option.value === party) || null}
        onChange={(event, newValue) => {
          setParty(newValue?.value || '');
        }}
        renderInput={(params) => <TextField {...params} label="Party Account" />}
      />
          <Stack direction="row" spacing={3}>
            {isChequePayment ? (
              <TextField
                id="outlined-basic"
                label="Cheque Number "
                variant="outlined"
                defaultValue=""
                value={chequeNumber}
                onChange={handleChequeNumberChange}
              />
            ) : (
              <TextField
                id="outlined-basic"
                label="Payment ID"
                variant="outlined"
                defaultValue=""
                disabled={isCashPayment}
                value={chequeNumber}
                onChange={handleChequeNumberChange}
              />
            )}
            <TextField
              id="outlined-basic"
              label="Voucher Number"
              variant="outlined"
              defaultValue="34554298"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              value={voucher}
              onChange={handleVoucherChange}
  
            />
          </Stack>
          <Stack direction="row" spacing={3}>
            <TextField
               id="outlined-basic"
               label="Amount"
               variant="outlined"
               defaultValue=""
               value={amount}
               onChange={handleAmountChange}
               inputProps={{
                 inputMode: 'numeric',
                 pattern: '[0-9]*',
               }}
            />
            <TextField
              id="outlined-basic"
              label="Bank"
              variant="outlined"
              defaultValue="HDFC Bank"
              disabled={isCashPayment}
            />
          </Stack>
          <Stack>
            <TextField label="Notes" multiline rows={6} maxRows={4} disabled={isCashPayment} />
          </Stack>
          <Stack direction="row" spacing={3} alignItems="center" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '150px', display: 'flex-right' }}
            >
              Save changes
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
