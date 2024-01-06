import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ItemCategoryCreateWarehouse from '../../sections/@dashboard/itemmaster/ItemMasterCreateWareHouse';

// ----------------------------------------------------------------------

export default function ItemCategoryCreate() {
  const { themeStretch } = useSettingsContext();

  return (
    <> 
      <Helmet>
        <title> Item Master: Create Warehouse</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Warehouse"
          links={[
            // { href: PATH_DASHBOARD.root }, 
            // { href: PATH_DASHBOARD.itemCategory.new },
          ]}
        />
        <ItemCategoryCreateWarehouse />
      </Container>
    </>
  );
}
