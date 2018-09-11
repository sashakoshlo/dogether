import uuid from "uuid";

export const addTask = (task) => ({
  type: "ADD_TASK",
  task: {
    id: uuid(),
    ...task,
    status: 'Open'
  },
});

export const editTask = (id, updates) => ({
  type: "EDIT_TASK",
  id,
  updates,
});

export const removeTask = id => ({
  type: "REMOVE_TASK",
  id,
});
