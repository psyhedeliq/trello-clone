import { AppContainer } from './styles';
import { Column } from './Column';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { addList } from './state/actions';

export const App = () => {
  const { lists, dispatch } = useAppState();
  console.log(lists.map((list) => list));

  return (
    <AppContainer>
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add new list'
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};
