import { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IInvoice, IInvoiceAddress } from '../../../@types/invoice';
// mock
import { _invoiceAddressFrom } from '../../../_mock/arrays';
// components
import FormProvider from '../../../components/hook-form';
//
import PurchasMasterEditDetails from './PurchasMasterEditDetails';
import PurchaseMasterEditAddress from './PurchaseMasterEditAddress';
import PurchaseMasterVoucherDate from './PurchaseMasterVoucherDate';

// ----------------------------------------------------------------------

type IFormValuesProps = Omit<IInvoice, 'createDate' | 'dueDate' | 'invoiceFrom' | 'invoiceTo'>;

interface FormValuesProps extends IFormValuesProps {
  createDate: Date | null;
  dueDate: Date | null;
  invoiceFrom: IInvoiceAddress | null;
  invoiceTo: IInvoiceAddress | null;
}

type Props = {
  isEdit?: boolean;
  currentInvoice?: FormValuesProps;
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice }: Props) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    invoiceTo: Yup.mixed().required('Invoice to is required'),
    dueDate: Yup.date().min(Yup.ref('createDate'), 'Due date must be later than create date'),
  });

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || '17099',
      createDate: currentInvoice?.createDate || new Date(),
      dueDate: currentInvoice?.dueDate || null,
      taxes: currentInvoice?.taxes || 0,
      status: currentInvoice?.status || 'draft',
      discount: currentInvoice?.discount || 0,
      invoiceFrom: currentInvoice?.invoiceFrom || _invoiceAddressFrom[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [
        { item_name: '', description: '', HSN: '', quantity: 0, price: 0.0, discount:0.0, CGST:0.0, SGST: 0.0, taxable: 0.0, payable: 0.0 },
      ],
      totalPrice: currentInvoice?.totalPrice || 0,
    }),
    [currentInvoice]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const handleSaveAsDraft = async (data: FormValuesProps) => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(false);
      navigate(PATH_DASHBOARD.invoice.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSave(false);
    }
  };

  const handleCreateAndSend = async (data: FormValuesProps) => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      navigate(PATH_DASHBOARD.invoice.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSend(false);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <PurchaseMasterEditAddress />

        <PurchaseMasterVoucherDate />

        <PurchasMasterEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          Save as Draft
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          style={{
            backgroundColor: '#4B49AC',
          }}
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Update' : 'Save'} & Print
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
