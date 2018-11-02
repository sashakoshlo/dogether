export default (tasks, { selectedProject }, { closedTasksVisible, text }) => {
  let projectTasks = tasks.filter(task => (task.projectId === selectedProject && task.name.toLowerCase().includes(text.toLowerCase())));
  if (closedTasksVisible) {
    return projectTasks;
  }

  return projectTasks.filter(task => task.status !== 'Closed');
}
