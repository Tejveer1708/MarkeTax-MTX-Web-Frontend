import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
  Link,
  Stack,
  Button,
  TableRow,
  Checkbox,
  // MenuItem,
  TableCell,
  IconButton,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { IProduct } from '../../../../@types/product';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
// import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: IProduct;
  selected: boolean;
  onEditRow: VoidFunction;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}: Props) {
  const { name, cover, createdAt, inventoryType, price } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  // const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  // const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
  //   setOpenPopover(event.currentTarget);
  // };

  // const handleClosePopover = () => {
  //   setOpenPopover(null);
  // };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              onClick={onViewRow}
              sx={{ cursor: 'pointer', width: '100%' }}
            >
              {name}
              <TableRow sx={{ color: 'grey', fontSize: '12px' }}>0009109010</TableRow>
            </Link>
          </Stack>
        </TableCell>

        <TableCell>{fDate(createdAt)}</TableCell>
        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (inventoryType === 'out_of_stock' && 'error') ||
              (inventoryType === 'low_stock' && 'warning') ||
              'success'
            }
            sx={{ textTransform: 'capitalize', left: '0' }}
          >
            {inventoryType ? sentenceCase(inventoryType) : ''}
          </Label>
        </TableCell>

        <TableCell align="center">{fCurrency(price)}</TableCell>

        <TableCell />

        <TableCell align="right">
          {/* <Iconify icon="eva:edit-fill" /> */}
          <Link
            noWrap
            color="inherit"
            variant="subtitle2"
            // onClick={}
            sx={{ cursor: 'pointer' }}
          >
            View Ledger
          </Link>
        </TableCell>

        <TableCell align="right">
          <Link
            noWrap
            color="inherit"
            variant="subtitle2"
            onClick={() => {
              onEditRow();
              // handleClosePopover();
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Iconify icon="eva:edit-fill" />
          </Link>
        </TableCell>

        <TableCell align="right">
          <Link
            noWrap
            color="inherit"
            variant="subtitle2"
            onClick={() => {
              handleOpenConfirm();
              // handleClosePopover();
            }}
            sx={{ cursor: 'pointer', color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
          </Link>
        </TableCell>
      </TableRow>

      {/* <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          View Ledger
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover> */}

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
