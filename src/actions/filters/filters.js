export const showClosedTasks = () => ({
  type: 'TOGGLE_CLOSED_TASKS',
  closedTasksVisible: true
});

export const hideClosedTasks = () => ({
  type: 'TOGGLE_CLOSED_TASKS',
  closedTasksVisible: false
});

export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
