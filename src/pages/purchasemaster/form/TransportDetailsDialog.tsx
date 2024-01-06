// @mui
import {
    Stack,
    Dialog,
    Button,
    Divider,
    Typography
} from '@mui/material';
// @types
// components
import { RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    onClose: VoidFunction;
};

export default function TransportDetailsDialog({
    open,
    onClose,
}: Props) {

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ pt: 3, px: 3, pb: 2 }}
            >
                <Typography variant="h6" style={{ fontWeight: 'bold' }}> Add Transporter Details </Typography>
            </Stack>

            <Divider />

            <Stack sx={{ p: 1.5, pt: 2, maxHeight: 80 * 8, overflowX: 'hidden' }}>
                <Stack
                    spacing={2}
                    justifyContent="flex-end"
                    direction={{ xs: 'column', md: 'row' }}
                    sx={{ width: 1 }}
                    paddingTop={2}
                >
                    <RHFTextField
                        size="small"
                        name="name"
                        label="Name"
                        placeholder="Name"
                    // sx={{ maxWidth: { md: 150 } }}
                    />
                    <RHFTextField
                        size="small"
                        name="gstin"
                        label="GSTIN"
                        placeholder="GSTIN"
                    // sx={{ maxWidth: { md: 150 } }}
                    />

                </Stack>
                <Stack sx={{ width: 1, pt: 2, pb: 2 }}>
                    <RHFTextField
                        size="small"
                        name="address"
                        label="Address"
                        placeholder="Address"
                    // sx={{ maxWidth: { md: 150 } }}
                    />

                </Stack>

            </Stack>

            <Divider />

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ pt: 3, px: 3, pb: 2 }}
            >
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <span style={{
                    width: '10px'
                }} />
                <Button
                    variant="contained"
                    // onClick={onClose}
                    style={{
                        backgroundColor: '#4B49AC'
                    }}
                >
                    Save
                </Button>
            </Stack>

        </Dialog>
    );
}

