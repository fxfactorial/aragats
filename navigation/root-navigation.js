import { StackNavigator, DrawerNavigator } from 'react-navigation';

import sales_related_tabs from './main-tab-navigator';

const stack = StackNavigator({
  Main: { screen: sales_related_tabs },
});

export default DrawerNavigator({
  'sales-screens': { screen: stack },
});
