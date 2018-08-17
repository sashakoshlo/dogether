export const selectProject = (id = undefined) => ({
  type: 'SELECT_PROJECT',
  id,
});

export const selectBoard = (id = undefined) => ({
  type: 'SELECT_BOARD',
  id,
});

export const selectTask = (id = undefined) => ({
  type: 'SELECT_TASK',
  id,
});
