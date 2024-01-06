import * as Yup from 'yup';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui

import {Card, Grid, Stack, Typography, Button } from '@mui/material';
import Frame from '../../../assets/data/Frame.png'
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

export default function ItemGodown({ isEdit, currentProduct }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewAccountSchema = Yup.object().shape({
    
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
        <Grid item xs={12} md={12}>
          <Stack spacing={3}>
            <Card sx={{ p: 2}} style={{backgroundColor: '#F4E5FF', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src={Frame} alt="" />
              <Typography
              style={{
                color: '#4B49AC',
                fontWeight: '700',
                fontSize: '32px'
              }}>Enable Godowns</Typography>
              <p 
              style={{
                width: '357px',
                fontSize: '16px',
                textAlign: 'center',
                color: '#637381',
              }}
              >Please enable this feature to add and manage your godowns along with inventory.</p>
              <Button variant='contained'  style={{
                width: "226px",
                height: "48px",
                borderRadius: "10px", 
                backgroundColor: '#FFCC00',
                fontSize: '18px',
                color: '#ffffff',
              }}>
              Enable
            </Button>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
