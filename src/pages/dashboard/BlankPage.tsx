import { Helmet } from 'react-helmet-async';
// @mui
// import { alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
// components

// ----------------------------------------------------------------------

// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useSettingsContext } from '../../components/settings';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// export interface DialogTitleProps {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// function BootstrapDialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

export default function BlankPage() {
  const { themeStretch } = useSettingsContext();

  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const StyledPaper = styled(
    Paper,
    {}
  )({
    padding: '30px',
    color: '#000000',
    backgroundColor: 'white',
    margin: '20px',
    borderRadius: 20,
    border: '1px solid #000000',
  });

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };

  const Button = styled('button')({
    padding: '0px 30px',
    color: 'white',
    backgroundColor: '#1976d2',
    border: 'none',
    borderRadius: '20px',
    marginLeft: '10px',
    fontSize: '1rem',
    fontWeight: '500',
  });

  const Label = styled('label')(
    ({ theme }) => `
    font-family: Public Sans, sans-serif;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-left: 30px;
    font-weight: 600;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
    `
  );

  return (
    <>
      <Helmet>
        <title> Create Account Master </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Create Account Master </Typography>
        <Box sx={{ flexGrow: '1' }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <StyledPaper>
                <Typography variant="h5" color={grey[400]} fontWeight="700">
                  Verify your GSTIN Number
                </Typography>
                <Label htmlFor="named-select">GSTIN Number</Label>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '10px',
                    margin: '10px',
                  }}
                >
                  <TextField fullWidth label="GSTIN Number" id="fullWidth" />
                  <Button>Verify</Button>
                </Box>
              </StyledPaper>
            </Grid>
            <Grid xs={6}>
              <StyledPaper>
                <Typography variant="h5" color={grey[400]} fontWeight="700">
                  Details
                </Typography>
                <Box
                  sx={{
                    padding: '10px',
                    margin: '10px',
                  }}
                >
                  <Label htmlFor="named-select">Name</Label>
                  <TextField fullWidth label="Name" id="fullWidth" />
                  <Label htmlFor="named-select">Print Name</Label>
                  <TextField fullWidth label="Print Name" id="fullWidth" />

                  <Box
                    sx={{
                      display: 'flex',
                      marginTop: '20px',
                      flexDirection: 'row',
                      padding: '10px 10px',
                    }}
                  >
                    <Label htmlFor="named-select" style={{ margin: '10px' }}>
                      Opening Balance
                    </Label>
                    <TextField fullWidth label="Opening Balance" id="fullWidth" />
                    <Label htmlFor="named-select" style={{ margin: '10px' }}>
                      Closing Balance
                    </Label>
                    <TextField fullWidth label="Closing Balance" id="fullWidth" />
                  </Box>
                  <Label htmlFor="named-select">Address</Label>
                  <TextField fullWidth label="Address" id="fullWidth" />
                </Box>
              </StyledPaper>
            </Grid>
            <Grid xs={6}>
              <StyledPaper>
                <Typography variant="h5" color={grey[400]} fontWeight="700">
                  Tax Details
                </Typography>
                <Box
                  sx={{
                    padding: '10px',
                    margin: '10px',
                  }}
                >
                  <Label htmlFor="named-select">PAN Number</Label>
                  <TextField fullWidth label="PAN Number" id="fullWidth" />
                  <Label htmlFor="named-select">Bank Name</Label>
                  <TextField fullWidth label="Bank Name" id="fullWidth" />
                  <Label htmlFor="named-select">Bank A/C Number</Label>
                  <TextField fullWidth label="Bank A/C Number" id="fullWidth" />
                  <Label htmlFor="named-select">IFSC Code</Label>
                  <TextField fullWidth label="IFSC Code" id="fullWidth" />
                  <Label htmlFor="named-select">GSTIN Number</Label>
                  <TextField fullWidth label="GSTIN Number" id="fullWidth" />
                </Box>
              </StyledPaper>
            </Grid>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <ButtonGroup variant="contained" aria-label="outlined button group">
                <ButtonGroup
                  style={{
                    backgroundColor: '#0067B5',
                    // boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    padding: '10px 100px',
                    border: 'none',
                  }}
                >
                  Save
                </ButtonGroup>
                <ButtonGroup
                  style={{
                    backgroundColor: '#FFCC00',
                    // boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    padding: '10px 100px',
                    border: 'none',
                  }}
                >
                  Edit
                </ButtonGroup>
                <ButtonGroup
                  style={{
                    backgroundColor: '#B6B6B6',
                    // boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: '700',
                    padding: '10px 100px',
                    border: 'none',
                  }}
                >
                  Clear
                </ButtonGroup>
              </ButtonGroup>
              {/* <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Edit Your Account Leadger
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Box sx={{ height: 400 }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Save changes
                  </Button>
                </DialogActions>
              </BootstrapDialog> */}
            </Box>
            <Grid xs={12}>
              <StyledPaper>
                <Typography variant="h5" color={grey[400]} fontWeight="700">
                  Other Details
                </Typography>
                <Box
                  sx={{
                    padding: '10px',
                    margin: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    textAlign: 'center',
                  }}
                >
                  <Label htmlFor="named-select" style={{ margin: '15px' }}>
                    City
                  </Label>
                  <TextField fullWidth label="City" id="fullWidth" />
                  <Label htmlFor="named-select" style={{ margin: '10px' }}>
                    Pin Code
                  </Label>
                  <TextField fullWidth label="Pin Code" id="fullWidth" />
                  <Label htmlFor="named-select" style={{ margin: '10px' }}>
                    Contact Number
                  </Label>
                  <TextField fullWidth label="Contact Number" id="fullWidth" />
                  <Label htmlFor="named-select" style={{ margin: '10px' }}>
                    Pay Limit
                  </Label>
                  <TextField fullWidth label="Pay Limit" id="fullWidth" />
                  <Label htmlFor="named-select" style={{ margin: '10px' }}>
                    Credit Days
                  </Label>
                  <TextField fullWidth label="Credit Days" id="fullWidth" />
                </Box>
                <Box
                  sx={{
                    padding: '10px',
                    margin: '10px',
                  }}
                >
                  <Label htmlFor="named-select">Email ID</Label>
                  <TextField
                    fullWidth
                    label="Email ID"
                    id="fullWidth"
                    style={{ margin: '0px 20px' }}
                  />
                </Box>
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
