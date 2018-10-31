export default (tasks, { selectedProject }, { closedTasksVisible }) => {
  let projectTasks = tasks.filter(task => task.projectId === selectedProject);
  if (closedTasksVisible) {
    return projectTasks;
  }

  return projectTasks.filter(task => task.status !== 'Closed');
}
