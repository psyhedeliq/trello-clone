import { AppContainer } from './styles';

import { Column } from './Column';
import { AddNewItem } from './AddNewItem';

export const App = () => {
  return (
    <AppContainer>
      <Column text='Todo' />
      <AddNewItem
        toggleButtonText='+ Add new list'
        onAdd={(e) => console.log(e)}
      />
    </AppContainer>
  );
};
