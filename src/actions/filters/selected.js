export const selectProject = (project = {}) => ({
  type: "SELECT_PROJECT",
  project
});

export const selectBoard = (id = undefined) => ({
  type: "SELECT_BOARD",
  id
});

export const selectTask = (task = {}) => ({
  type: "SELECT_TASK",
  task
});
