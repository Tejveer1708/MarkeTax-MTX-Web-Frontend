import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ItemCategoryNewEditForm from '../../sections/@dashboard/itemmaster/ItemMasterNewEditForm';

// ----------------------------------------------------------------------

export default function ItemCategoryCreate() {
  const { themeStretch } = useSettingsContext();

  return (
    <> 
      <Helmet>
        <title> Item Category: Create a new item</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Item Category"
          links={[
            // { href: PATH_DASHBOARD.root }, 
            // { href: PATH_DASHBOARD.itemCategory.new },
          ]}
        />
        <ItemCategoryNewEditForm />
      </Container>
    </>
  );
}
