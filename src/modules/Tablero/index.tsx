import { Suspense, useCallback, useState } from 'react';

import Grid from '@mui/material/Grid';
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import TarjetaIncidencia from './components/TarjetaIncidencia';

const initialTasks = [
  {
    id: '1',
    text: 'React.js',
  },
  {
    id: '2',
    text: 'HTML/CSS',
  },
  {
    id: '3',
    text: 'AWS',
  },
  {
    id: '4',
    text: 'JavaScript',
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Tablero = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    setTasks((prevTasks) =>
      reorder(prevTasks, source.index, destination.index)
    );
  };

  return (
    <Suspense>
      <Grid py={6} px={8} container>
        <h1>Estudiar</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(droppableProvided) => (
              <ul
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="task-container"
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(draggableProvided) => (
                      <li
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        className="task-item"
                      >
                        <TarjetaIncidencia />
                      </li>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Suspense>
  );
};

export default Tablero;
