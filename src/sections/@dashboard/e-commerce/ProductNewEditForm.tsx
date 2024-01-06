import * as Yup from 'yup';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui

import {Card, Grid, Stack, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { LoadingButton } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Container } from '@mui/system';
import Select from '@mui/material/Select';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IProduct } from '../../../@types/product';
// components
import { CustomFile } from '../../../components/upload';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';

interface FormValuesProps extends Omit<IProduct, 'images'> {
  taxes: boolean;
  inStock: boolean;
  images: (CustomFile | string)[];
}

type Props = {
  isEdit?: boolean;
  currentProduct?: IProduct;
};

export default function ProductNewEditForm({ isEdit, currentProduct }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewAccountSchema = Yup.object().shape({
    // gstin: Yup.string().required('GSTIN Number is Required'),
    // name: Yup.string().required('Name is required'),
    // printname: Yup.string().required('Name is required'),
    // openingBal: Yup.number().required('Opening Balance is required'),
    // closingBal: Yup.number().required('Closing Balance is required'),
    // address: Yup.string().required('Address is required'),
    // pan: Yup.string().required('PAN Number is required'),
    // bankn: Yup.string().required('Bank Name is required'),
    // acnumber: Yup.string().required('Account Number is required'),
    // ifsccode: Yup.string().required('IFSC Code is required'),
    // city: Yup.string().required('City Name is required'),
    // emailid: Yup.string().required('Email ID is required'),
    // pincode: Yup.number().required('Pin Code is required'),
    // contact: Yup.number().required('Phone Number is required'),
    // paylimit: Yup.number().required('Pay Limit Amount is required'),
    // creditdays: Yup.string().required('Credit Days is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      priceSale: currentProduct?.priceSale || 0,
      inStock: true,
      taxes: true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAccountSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6.1}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ color: 'text.secondary' }}>
              Verify Your GSTIN Number
            </Typography>
            <Grid spacing={3} mt={2} display="flex" flexDirection="row">
              <Stack width="80%">
                <RHFTextField name="gstin" label="GSTIN Number" />
              </Stack>
              <Stack  width="20%">
                <LoadingButton
                  type="submit"
                  sx={{
                    marginTop: '4.5px',
                    marginLeft: '8px',
                    padding: '10px 15px',
                    color: 'white',
                    backgroundColor: '#1976d2',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '1rem',
                    fontWeight: '500',
                  }}
                >
                  Verify
                </LoadingButton>
              </Stack>
            </Grid>
          </Card>
        </Grid>
        

        <Container style={{
          position: 'fixed',
          bottom: '20px',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
          }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <LoadingButton
              type="submit"
              //   loading={}
              style={{
                color: '#fff',
                backgroundColor: '#0067B5',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                fontSize: '1rem',
                fontWeight: '600',
                padding: '10px 45px',
                border: 'none',
              }}
            >
              Save
            </LoadingButton>
            <LoadingButton
              type="submit"
              //   loading={}
              style={{
                color: '#fff',
                backgroundColor: '#FFCC00',
                boxShadow: '0px 10px 10px 0px rgba(0, 0, 0, 0.25)',
                fontSize: '1rem',
                fontWeight: '600',
                padding: '10px 45px',
                border: 'none',
              }}
            >
              Edit
            </LoadingButton>
            <LoadingButton
              style={{
                color: '#fff',
                backgroundColor: '#B6B6B6',
                boxShadow: '0px 10px 10px 0px rgba(0, 0, 0, 0.25)',
                fontSize: '1rem',
                fontWeight: '600',
                padding: '10px 45px',
                border: 'none',
              }}
            >
              Clear
            </LoadingButton>
          </ButtonGroup>
        </Container>


        <Grid item xs={12} md={6}>
          <Stack mt={2}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                Details
              </Typography>
              <Stack spacing={3} mt={3}>
                <RHFTextField name="name" label="Name" />
                <RHFTextField name="printname" label="Print Name" />
              </Stack>
              <Stack spacing={3} mt={3}>
                <Grid
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="openingBal" label="Opening Balance" />
                  <RHFTextField name="closingBal" label="Closing Balance" />
                </Grid>
              </Stack>
              <Stack>
                <Grid
                  mt={3}
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">
                      Choose Your Group Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten80 Company</MenuItem>
                      <MenuItem value={20}>Twenly</MenuItem>
                      <MenuItem value={30}>Thirsty Adams</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">
                      Choose Your State Code
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>01 (Jammu & Kashmir)</MenuItem>
                      <MenuItem value={2}>2 (Himachal Pradesh)</MenuItem>
                      <MenuItem value={3}>3 (Punjab)</MenuItem>
                      <MenuItem value={4}>4 (Chandigarh)</MenuItem>
                      <MenuItem value={5}>5 (Uttarakhand)</MenuItem>
                      <MenuItem value={6}>6 (Haryana)</MenuItem>
                      <MenuItem value={7}>7 (Delhi)</MenuItem>
                      <MenuItem value={8}>8 (Rajasthan)</MenuItem>
                      <MenuItem value={9}>9 (Uttar Pradesh)</MenuItem>
                      <MenuItem value={10}>10 (Bihar)</MenuItem>
                      <MenuItem value={11}>11 (Sikkim)</MenuItem>
                      <MenuItem value={12}>12 (Arunachal Pradesh)</MenuItem>
                      <MenuItem value={13}>13 (Nagaland)</MenuItem>
                      <MenuItem value={14}>14 (Manipur)</MenuItem>
                      <MenuItem value={15}>15 (Mizoram)</MenuItem>
                      <MenuItem value={16}>16 (Tripura)</MenuItem>
                      <MenuItem value={17}>17 (Meghalaya)</MenuItem>
                      <MenuItem value={18}>18 (Assam)</MenuItem>
                      <MenuItem value={19}>19 (West Bengal)</MenuItem>
                      <MenuItem value={20}>20 (Jharkhand)</MenuItem>
                      <MenuItem value={21}>21 (Orissa)</MenuItem>
                      <MenuItem value={22}>22 (Chhattisgarh)</MenuItem>
                      <MenuItem value={23}>23 (Madhya Pradesh)</MenuItem>
                      <MenuItem value={24}>24 (Gujarat)</MenuItem>
                      <MenuItem value={25}>25 (Daman & Diu)</MenuItem>
                      <MenuItem value={26}>26 (Dadra & Nagar Haveli)</MenuItem>
                      <MenuItem value={27}>27 (Maharashtra)</MenuItem>
                      <MenuItem value={28}>28 (Andhra Pradesh (Old))</MenuItem>
                      <MenuItem value={29}>29 (Karnataka)</MenuItem>
                      <MenuItem value={30}> (Goa)</MenuItem>
                      <MenuItem value={31}>31 (Lakshadweep)</MenuItem>
                      <MenuItem value={32}>32 (Kerala)</MenuItem>
                      <MenuItem value={33}>33 (Tamil Nadu)</MenuItem>
                      <MenuItem value={34}>34 (Puducherry)</MenuItem>
                      <MenuItem value={35}>35 (Andaman & Nicobar Islands)</MenuItem>
                      <MenuItem value={36}>36 (Telengana)</MenuItem>
                      <MenuItem value={37}>37 (Andhra Pradesh (New))</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Stack>
              <Stack spacing={2} mt={3}>
                <RHFTextField name="address" label="Address" />
              </Stack>
            </Card>
          </Stack>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Stack spacing={3} mt={2}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                Tax Details
              </Typography>
              <Stack spacing={3} mt={3}>
                <RHFTextField name="pan" label="PAN Number" />
                <RHFTextField name="bankn" label="Bank Name" />
                <RHFTextField name="acnumber" label="Bank A/C Number" />
                <RHFTextField name="ifsccode" label="IFSC Code" />
                <RHFTextField name="gstin" label="GSTIN Number" />
              </Stack>
            </Card>
          </Stack>
        </Grid>
        {/* <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          
        </Grid> */}
        <Grid item xs={12} md={12}>
          <Stack spacing={3}>
            <Card sx={{ p: 2}}>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                Other Details
              </Typography>
              <Grid
                spacing={3}
                mt={3}
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="city" label="City" />
                <RHFTextField name="pincode" label="Pin Code" />
              </Grid>
              <Grid
                spacing={3}
                mt={3}
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="contact" label="Contact Number" />
                <RHFTextField name="paylimit" label="Pay Limit" />
              </Grid>
              <Grid
                spacing={3}
                mt={3}
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="creditdays" label="Credit Days" />
                <RHFTextField name="emailid" type="email" label="Email ID" />
              </Grid>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
