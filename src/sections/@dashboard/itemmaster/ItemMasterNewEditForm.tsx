import * as Yup from 'yup';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Card, Grid, Stack } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { LoadingButton } from '@mui/lab';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import { Container } from '@mui/system';
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
      navigate(PATH_DASHBOARD.itemMaster.item);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Container
          style={{
            position: 'fixed',
            bottom: '100px',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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

        <Grid item xs={12} md={12}>
          <Stack spacing={3}>
            <Card sx={{ p: 2 }}>
              <Grid
                spacing={3}
                mt={1}
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="group_name" label="Group Name" />
                <RHFTextField name="hsn_code" label="HSN/SAC Code" />
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
                <RHFTextField name="cgst" label="CGST %" />
                <RHFTextField name="sgst" label="SGST %" />
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
                <RHFTextField name="creditdays" label="IGST %" />
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
                <LoadingButton
                  type="submit"
                  style={{
                    color: '#fff',
                    backgroundColor: '#0067B5',
                    // boxShadow: '0px 10px 10px 0px rgba(0, 0, 0, 0.25)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    padding: '10px 10px',
                    border: 'none',
                    width: '30%',
                  }}
                >
                  Other Tax
                </LoadingButton>
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
                <FormControlLabel control={<Checkbox color="secondary"/>} label="Check, If Readymade Garment Category. 5% <= 1000 rate & 12% > 1000" />
                <FormControlLabel control={<Checkbox color="secondary" />} label="Check, If Shoes Category. 5% <= 1000 rate & 18% > 1000" />
              </Grid>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
