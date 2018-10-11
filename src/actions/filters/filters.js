export const showClosedTasks = () => ({
  type: 'TOGGLE_CLOSED_TASKS',
  closedTasksVisible: true
});

export const hideClosedTasks = () => ({
  type: 'TOGGLE_CLOSED_TASKS',
  closedTasksVisible: false
});
