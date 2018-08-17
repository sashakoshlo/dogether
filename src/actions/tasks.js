import uuid from 'uuid';

export const addTask = (name, boardId) => ({
  type: 'ADD_TASK',
  task: {
    id: uuid(),
    name,
    boardId,
  },
});

export const editTask = (id, updates) => ({
  type: 'EDIT_TASK',
  id,
  updates,
});

export const removeTask = id => ({
  type: 'REMOVE_TASK',
  id,
});
