import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ItemGodown from '../../sections/@dashboard/itemmaster/ItemGodown';

// ----------------------------------------------------------------------

export default function ItemMasterGodown() {
  const { themeStretch } = useSettingsContext();

  return (
    <> 
      <Helmet>
        <title> Item Master: Godown (Warehouse)</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Godown (Warehouse)"
          links={[
            // { href: PATH_DASHBOARD.root }, 
            // { href: PATH_DASHBOARD.itemCategory.new },
          ]}
        />
        <ItemGodown />
      </Container>
    </>
  );
}
