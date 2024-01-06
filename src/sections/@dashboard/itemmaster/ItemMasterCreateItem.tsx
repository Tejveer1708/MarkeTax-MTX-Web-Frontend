import * as Yup from 'yup';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Grid, Stack, Typography, Divider } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { LoadingButton } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Container } from '@mui/system';
import Select from '@mui/material/Select';
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IProduct } from '../../../@types/product';
// components
import { CustomFile } from '../../../components/upload';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField, RHFUpload, RHFSelect } from '../../../components/hook-form';

interface FormValuesProps extends Omit<IProduct, 'images'> {
  taxes: boolean;
  inStock: boolean;
  images: (CustomFile | string)[];
}

type Props = {
  isEdit?: boolean;
  currentProduct?: IProduct;
};

export default function ItemMasterCreateItem({ isEdit, currentProduct }: Props) {
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

  const UNIT_TYPE_OPTIONS = [
    { id: 1, name: 'BAG' },
    { id: 2, name: 'BAL' },
    { id: 3, name: 'BDL' },
    { id: 4, name: 'BKL' },
    { id: 5, name: 'BOU' },
    { id: 6, name: 'BOX' },
    { id: 7, name: 'BTL' },
    { id: 8, name: 'BUN' },
    { id: 9, name: 'CAN' },
    { id: 10, name: 'CBM' },
    { id: 11, name: 'CCM' },
    { id: 12, name: 'CMS' },
    { id: 13, name: 'CTN' },
    { id: 14, name: 'DOZ' },
    { id: 15, name: 'DRM' },
    { id: 16, name: 'GGR' },
    { id: 17, name: 'GMS' },
    { id: 18, name: 'GRS' },
    { id: 19, name: 'GYD' },
    { id: 20, name: 'KGS' },
    { id: 21, name: 'KLR' },
    { id: 22, name: 'KLR' },
    { id: 23, name: 'MLT' },
    { id: 24, name: 'MTR' },
    { id: 25, name: 'MTS' },
    { id: 26, name: 'NOS' },
    { id: 27, name: 'PAC' },
    { id: 28, name: 'PCS' },
    { id: 29, name: 'PRS' },
    { id: 30, name: 'QTL' },
    { id: 31, name: 'ROL' },
    { id: 32, name: 'SET' },
    { id: 33, name: 'SQF' },
    { id: 34, name: 'SQM' },
    { id: 35, name: 'SQY' },
    { id: 36, name: 'TBS' },
    { id: 37, name: 'TGM'},
    { id: 38, name: 'THD'},
    { id: 39, name: 'TON'},
    { id: 40, name: 'TUB'},
    { id: 41, name: 'UGS'},
    { id: 42, name: 'UNT'},
    { id: 43, name: 'YDS'},
    { id: 44, name: 'OTH'},
  ];

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAccountSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = methods;
  const values = watch();

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

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = values.images && values.images?.filter((file) => file !== inputFile);
    setValue('images', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <Stack mt={1}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                General
              </Typography>
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
                  <RHFTextField name="item_name" label="Item Name" />
                  <RHFTextField name="item_code" label="Item Code" />
                </Grid>
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
                  <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">
                      Choose Your Group Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Choose Your Group Name"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten80 Company</MenuItem>
                      <MenuItem value={20}>Twenly</MenuItem>
                      <MenuItem value={30}>Thirsty Adams</MenuItem>
                    </Select>
                  </FormControl>
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
                  <RHFTextField name="name" label="Print Name"/>
                  <RHFSelect
                    name="city"
                    size="medium"
                    label="Unit Type"
                    InputLabelProps={{ shrink: true }}
                    sx={{ maxWidth: { md: 250 } }}
                  >
                    <MenuItem sx={{ fontStyle: 'italic', color: 'text.secondary' }}>None</MenuItem>

                    <Divider />

                    {UNIT_TYPE_OPTIONS.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
              </Stack>

              <Stack spacing={2} mt={3}>
                <Grid
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="openqty" label="Opening QTY" />
                  <RHFTextField name="closeqty" label="Closing QTY" />
                </Grid>
              </Stack>

              <Stack spacing={2} mt={3}>
                <Grid
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="prate" label="Purchase Rate" />
                  <RHFTextField name="srate" label="Sale Rate" />
                </Grid>
              </Stack>

              <Stack spacing={2} mt={3}>
                <Grid
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="msrate" label="Minimun Sale Rate" />
                  <RHFTextField name="mrp" label="MRP" />
                </Grid>
              </Stack>

              <Stack spacing={2} mt={3}>
                <Grid
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="openstock" label="Opening Stock Value" />
                  <RHFTextField name="closestock" label="Closing Stock Value" />
                </Grid>
              </Stack>
            </Card>
          </Stack>
        </Grid>

        <Container 
          style={{
            position: 'fixed',
            bottom: '20px',
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

        <Grid
          item
          md={6}
          xs={12}
          gridTemplateRows={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
          }}
        >
          <Grid item xs={12} md={12}>
            <Stack mt={1}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                  Add Specification
                </Typography>
                <Stack spacing={3} mt={3}>
                  <RHFTextField name="brandname" label="Brand Name" />
                </Stack>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={3} mt={2}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                  Store Specification
                </Typography>
                <Stack spacing={3} mt={3}>
                  <RHFTextField name="pan" label="Item Description" />
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Add Images
                  </Typography>

                  <RHFUpload
                    multiple
                    thumbnail
                    name="images"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.log('ON UPLOAD')}
                  />
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
