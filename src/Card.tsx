import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { moveTask, setDraggedItem } from './state/actions';
import { useAppState } from './state/AppStateContext';
import { CardContainer } from './styles';
import { isHidden } from './utils/isHidden';
import { useItemDrag } from './utils/useItemDrag';

type CardProps = {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
};

export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({
    type: 'CARD',
    id,
    columnId,
    text,
  });
  const [, drop] = useDrop({
    accept: 'CARD',
    // we need to throttle this function because of the way event triggering works when you hover something, to avoid running into some race condition issues. The hover event that well use might be triggered to frequently, so we need to throttle it.
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }

      if (draggedItem.type !== 'CARD') {
        return;
      }

      if (draggedItem.id === id) {
        return;
      }
      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
      dispatch(setDraggedItem({ ...draggedItem, columnId }));
    }),
  });

  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, 'CARD', id, isPreview)}
    >
      {text}
    </CardContainer>
  );
};
