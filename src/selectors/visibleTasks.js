export default (tasks, { closedTasksVisible }) => {
  if (closedTasksVisible) {
    return tasks;
  }

  return tasks.filter(task => task.status !== 'Closed');
}
