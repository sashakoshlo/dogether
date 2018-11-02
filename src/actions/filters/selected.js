export const selectProject = (projectId = null) => ({
  type: "SELECT_PROJECT",
  projectId
});

export const selectTask = (task = {}) => ({
  type: "SELECT_TASK",
  task
});
