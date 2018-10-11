export const selectProject = (project = {}) => ({
  type: "SELECT_PROJECT",
  project
});

export const selectTask = (task = {}) => ({
  type: "SELECT_TASK",
  task
});
