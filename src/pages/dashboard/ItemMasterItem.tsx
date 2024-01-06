import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ItemMasterCreateItem from '../../sections/@dashboard/itemmaster/ItemMasterCreateItem';

// ----------------------------------------------------------------------

export default function ItemMasterItem() {
  const { themeStretch } = useSettingsContext();

  return (
    <> 
      <Helmet>
        <title> Item Master: Create Item</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create Item"
          links={[
            // { href: PATH_DASHBOARD.root }, 
            // { href: PATH_DASHBOARD.itemCategory.new },
          ]}
        />
        <ItemMasterCreateItem />
      </Container>
    </>
  );
}
