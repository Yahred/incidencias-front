import { Suspense, useState } from 'react';

import Grid from '@mui/material/Grid';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import TarjetaIncidencia from './components/TarjetaIncidencia';
import ContenedorTablero from './components/ContenedorTablero';
import { Typography } from '@mui/material';
import ColumnaTablero from './components/ColumnaTablero';

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" direction="vertical">
            {(droppableProvided) => (
              <ColumnaTablero>
                <Typography>Pendiente</Typography>
                <ContenedorTablero
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <li
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}
                          style={{ listStyle: 'none' }}
                        >
                          <TarjetaIncidencia />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </ContenedorTablero>
              </ColumnaTablero>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Suspense>
  );
};

export default Tablero;
