import { AppContainer } from './styles';

import { Column } from './Column';
import { AddNewItem } from './AddNewItem';

export const App = () => {
  return (
    <AppContainer>
      <Column text='Todo' />
      <AddNewItem
        toggleButtonText='+ Add new list'
        onAdd={() => console.log('Item created')}
      />
    </AppContainer>
  );
};
