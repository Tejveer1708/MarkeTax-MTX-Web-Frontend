/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
import React from "react";
// @mui
import { Box, Stack, Button, Divider, Typography, MenuItem, Select, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Dialog, ListItemButton, TextField } from '@mui/material';
// import { makeStyles } from '@mui/material';

import { InputAdornment } from '@material-ui/core'

import { sum } from "lodash";
// components
import { RHFCheckbox, RHFTextField } from '../../../components/hook-form';
import Iconify from "../../../components/iconify/Iconify";

interface FormData {

  title: string;
  description: string;
  quantity: number;
  discountType: string;
  price: number;
  total: number;
  HSN: string;
  discount: number;
  CGST: number;
  SGST: number;
  taxable: number;
  payable: number;
  isGST: boolean;

}


export default function PurchasMasterEditDetails() {
  const [formDataList, setFormDataList] = React.useState<FormData[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogDataList, setDialogDataList] = React.useState<FormData[]>([
    {
      "title": "Product A",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "quantity": 2,
      "discountType": "%",
      "price": 10.0,
      "total": 20.0,
      "HSN": "12345678",
      "discount": 5.0,
      "CGST": 2.5,
      "SGST": 2.5,
      "taxable": 15.0,
      "payable": 17.5,
      "isGST": true
    },
    {
      "title": "Product B",
      "description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "quantity": 1,
      "discountType": "%",
      "price": 50.0,
      "total": 50.0,
      "HSN": "98765432",
      "discount": 10.0,
      "CGST": 7.5,
      "SGST": 7.5,
      "taxable": 40.0,
      "payable": 45.0,
      "isGST": true
    },
    {
      "title": "Product C",
      "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "quantity": 3,
      "discountType": "%",
      "price": 8.0,
      "total": 24.0,
      "HSN": "56789012",
      "discount": 15.0,
      "CGST": 1.2,
      "SGST": 1.2,
      "taxable": 20.4,
      "payable": 22.8,
      "isGST": true
    }

  ]);
  const [selectedDataIndex, setSelectedDataIndex] = React.useState<
    number | null
  >(null);
  const [formValues, setFormValues] = React.useState<FormData>({
    title: '--',
    description: '--',
    quantity: 1,
    discountType: '₹',
    price: 0,
    total: 0,
    HSN: '--',
    discount: 0,
    CGST: 0,
    SGST: 0,
    taxable: 0,
    payable: 0,
    isGST: true,
  });

  const totalOnRow = formDataList.map((item: FormData) => item.quantity * item.price);

  const totalQuantityOnRow = formDataList.map((item: FormData) => item.quantity);

  const totalCGSTOnRow = formDataList.map((item: FormData) => (item.isGST ? ((12 / 100) * (item.quantity * item.price)) : (0)));

  const totalSGSTOnRow = formDataList.map((item: FormData) => (item.isGST ? ((12 / 100) * (item.quantity * item.price)) : (0)));

  const totalDiscountOnRow = formDataList.map((item: FormData) => ((item.discountType === '%' ? (item.discount / 100 * (item.quantity * item.price)) : (item.discount)) + (((12 / 100) * (item.quantity * item.price)) * 2)));

  const totalNewOnRow = formDataList.map((item: FormData) => ((item.quantity * item.price) + (((12 / 100) * (item.quantity * item.price)) * 2)) - ((item.discountType === '%' ? (item.discount / 100 * (item.quantity * item.price)) : (item.discount)) + (((12 / 100) * (item.quantity * item.price)) * 2)));

  const totalPrice = sum(totalNewOnRow);

  const totalTaxablePrice = sum(totalOnRow);

  const totalTax = sum(totalCGSTOnRow) * 2;

  const totalQuantity = sum(totalQuantityOnRow);

  const totalDiscount = sum(totalDiscountOnRow);

  const handleAddData = (): void => {
    setShowDialog(true);
  };

  const handleSelectData = (index: number): void => {
    setFormDataList((prevDataList) => [
      ...prevDataList,
      { ...dialogDataList[index] }
    ]);
    setFormValues(dialogDataList[index]);
    setShowDialog(false);
  };

  const handleEditData = (index: number): void => {
    setSelectedDataIndex(index);
    setFormValues(formDataList[index]);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCheckChange = (e: any): void => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const calculateTotal = (): number => {
    const { quantity, price, discountType, discount } = formValues;
    let total = Number(quantity) * Number(price);

    if (discountType === "%") {
      total -= (Number(discount) / 100) * total;
    } else {
      total -= Number(discount);
    }

    return total;
  };

  const handleDiscountTypeChange = (event: any): void => {
    const discountType = event.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      discountType,
      total: calculateTotal(),
    }));
  };

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const discount = event.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      discount: Number(discount),
      total: calculateTotal(),
    }));
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (selectedDataIndex !== null) {
      setFormDataList((prevDataList) => {
        const updatedDataList = [...prevDataList];
        updatedDataList[selectedDataIndex] = formValues;
        return updatedDataList;
      });
    }

    setFormValues({
      title: '--',
      description: '--',
      quantity: 1,
      discountType: '₹',
      price: 0,
      total: 0,
      HSN: '--',
      discount: 0,
      CGST: 0,
      SGST: 0,
      taxable: 0,
      payable: 0,
      isGST: true,
    });
    setSelectedDataIndex(null);
  };

  const handleDeleteData = (index: number): void => {
    setFormDataList((prevDataList) => {
      const updatedDataList = [...prevDataList];
      updatedDataList.splice(index, 1);
      return updatedDataList;
    });
    setSelectedDataIndex(null);
  };



  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, pb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Stack alignItems="flex-end" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <RHFTextField
              size="small"
              name="title"
              value={formValues.title}
              label="Title"
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
              sx={{ maxWidth: { md: 240 } }} />

            <RHFTextField
              size="small"
              name="description"
              value={formValues.description}
              onChange={handleFormChange}
              label="Description"
              InputLabelProps={{ shrink: true }}
              sx={{ maxWidth: { md: 240 } }} />
            <RHFTextField
              disabled
              size="small"
              name="HSN"
              value={formValues.HSN}
              onChange={handleFormChange}
              label="HSN Code"
              placeholder="Front end"
              InputLabelProps={{ shrink: true }}
              sx={{ maxWidth: { md: 180 } }} />

            <RHFTextField
              size="small"
              type="number"
              name="quantity"
              value={formValues.quantity}
              onChange={handleFormChange}
              label="Quantity"
              placeholder="0"
              InputLabelProps={{ shrink: true }}
              sx={{ maxWidth: { md: 100 } }} />

            <div className="field-container">

              <RHFTextField
                size="small"
                type="number"
                value={formValues.price}
                name="price"
                onChange={handleFormChange}
                label="Unit Price"
                placeholder="0"
                InputProps={{
                  startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
                }}
                sx={{ maxWidth: { md: 140 } }} />
              <RHFCheckbox
                name="isGST"
                label="is GST"
                checked={formValues.isGST}
                onChange={handleCheckChange}
                sx={{
                  '& .Mui-checked': {
                    color: '#4B49AC !important'
                  }
                }}
              />
            </div>
            <div className="field-container">
              <RHFTextField
                size="small"
                type="number"
                value={formValues.discount}
                name="discount"
                label="Discount"
                placeholder="0"
                onChange={handleDiscountChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
                  endAdornment: (<InputAdornment
                    position='end'
                  >
                    <Select 
                    style={{ margin: '0px !important' }}
                    value={formValues.discountType} onChange={handleDiscountTypeChange}>
                      <MenuItem value="%">%</MenuItem>
                      <MenuItem value="₹">₹</MenuItem>
                    </Select>
                  </InputAdornment>)
                }}
                sx={{ maxWidth: { md: 140 } }} />
              <Typography
                sx={{ color: 'text.disabled', fontSize: '10' }}
              >
                {formValues.discountType === '%' ? 'Discount (%):' : 'Discount (₹):'}
                {formValues.discount}
              </Typography>
            </div>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }} paddingTop={1}>

            <RHFTextField
              disabled
              size="small"
              name="taxable"
              label="Taxable Amount"
              placeholder="0"
              value={totalCGSTOnRow[selectedDataIndex || 0] * 2}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
              }}
              sx={{ maxWidth: { md: 160 } }} />

            <RHFTextField
              disabled
              size="small"
              name="CGST"
              label="CGST (12%)"
              placeholder="0"
              value={totalCGSTOnRow[selectedDataIndex || 0]}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
              }}
              sx={{ maxWidth: { md: 160 } }} />

            <RHFTextField
              disabled
              size="small"
              name="SGST"
              label="SGST (12%)"
              placeholder="0"
              value={totalSGSTOnRow[selectedDataIndex || 0]}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
              }}
              sx={{ maxWidth: { md: 160 } }} />

            <RHFTextField
              disabled
              size="small"
              name="payable"
              label="Payable Amount"
              placeholder="0"
              value={totalNewOnRow[selectedDataIndex || 0]}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
              }}
              sx={{ maxWidth: { md: 160 } }} />
          </Stack>
          {selectedDataIndex !== null && (
            <Button size="small"
              style={{
                color: '#4B49AC',
              }}
              startIcon={<Iconify icon="eva:check-fill" />}
              onClick={handleSubmit}>Save</Button>
          )}
          <Button
            size="small"
            style={{
              color: '#4B49AC',
            }}
            startIcon={<Iconify icon="eva:check-fill" />}
            onClick={handleAddData}
          >
            Add Item
          </Button>
        </Stack>
        <h2>Item List</h2>
        <TableContainer sx={{ paddingBottom: 10 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>HSN Code</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Taxable Amount</TableCell>
                <TableCell>CGST</TableCell>
                <TableCell>SGST</TableCell>
                <TableCell>Payable Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formDataList.map((data, index: number) => (
                <TableRow key={index} onClick={() => handleEditData(index)}>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.HSN}</TableCell>
                  <TableCell>{data.quantity}</TableCell>
                  <TableCell>{data.price}</TableCell>
                  <TableCell>{data.discount + data.discountType}</TableCell>
                  <TableCell>{totalCGSTOnRow[index] * 2}</TableCell>
                  <TableCell>{totalCGSTOnRow[index]}</TableCell>
                  <TableCell>{totalSGSTOnRow[index]}</TableCell>
                  <TableCell>{totalNewOnRow[index]}</TableCell>
                  <TableCell>
                    <Button
                      style={{
                        color: '#4B49AC',
                      }}
                      startIcon={<Iconify icon="eva:edit-fill" />}
                      onClick={() => handleEditData(index)}>
                      Edit
                    </Button>
                    <Button startIcon={<Iconify icon="material-symbols:delete" />} sx={{ color: "red" }} onClick={() => handleDeleteData(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Typography>Total Quantity :</Typography>
        <Typography sx={{ textAlign: 'right', paddingBottom: 1, width: 120 }}>
          &#8377; {totalQuantity || '-'}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Typography>Total Taxable Amount :</Typography>
        <Typography
          sx={{ textAlign: 'right', paddingBottom: 1, width: 120, ...(formValues.discount && { color: 'error.main' }) }}
        >
          &#8377; {totalTaxablePrice || '-'}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Typography>Discount :</Typography>
        <Typography sx={{ textAlign: 'right', paddingBottom: 1, width: 120 }}>
          &#8377; {totalDiscount || '-'}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Typography>Taxes :</Typography>
        <Typography sx={{ textAlign: 'right', paddingBottom: 1, width: 120 }}>
          &#8377;  {totalTax || '-'}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total price :</Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right', paddingBottom: 1, width: 120 }}>
          &#8377;  {totalPrice || '-'}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <RHFCheckbox
          name="isGST"
          label="Create E-Bill"
          sx={{
            '& .Mui-checked': {
              color: '#4B49AC !important'
            }
          }}
        />
        <RHFCheckbox
          name="isGST"
          label="Create E-Way Bill"
          sx={{
            '& .Mui-checked': {
              color: '#4B49AC !important'
            }
          }}
        />
        <RHFCheckbox
          name="isGST"
          label="Mark As Paid"
          sx={{
            '& .Mui-checked': {
              color: '#4B49AC !important'
            }
          }}
        />
      </Stack>
      {showDialog && (
        <Dialog fullWidth maxWidth="xs" open={showDialog}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pt: 2.5, px: 3 }}
          >
            <Typography variant="h6"> Select Item </Typography>

            <Button
              size="small"
              startIcon={<Iconify style={{
                color: 'red'
              }} icon="material-symbols:cancel" />}
              sx={{ alignSelf: 'flex-end' }}
              onClick={() => setShowDialog(false)}
            />
          </Stack>

          <Stack sx={{ p: 2.5 }}>
            <TextField
              //  value={searchFormData}
              //  onChange={handleSearchFormData}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>


          <Stack sx={{ p: 1.5, pt: 0, maxHeight: 80 * 8, overflowX: 'hidden' }}>
            {dialogDataList.map((formD, index) => (
              <ListItemButton
                key={formD.HSN}
                onClick={() => handleSelectData(index)}
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  '&.Mui-selected': {
                    bgcolor: 'action.selected',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    },
                  },
                }}
              >
                <Typography variant="subtitle2">{formD.title}</Typography>

                <Typography
                  variant="caption"
                  component="div"
                  sx={{
                    my: 0.5,
                    color: 'info.main',
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  {formD.description}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {formD.HSN}
                </Typography>
              </ListItemButton>
            ))}
          </Stack>
        </Dialog>
      )}

      <style>{`
      .field-container {
        display: stack;
      }
    `}</style>
    </Box>

  );
};
