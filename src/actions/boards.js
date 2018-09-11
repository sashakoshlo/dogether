import uuid from "uuid";

export const addBoard = (name, projectId) => ({
  type: "ADD_BOARD",
  board: {
    id: uuid(),
    name,
    projectId,
  },
});

// Usage: updates should be an object with properties your are changing
export const editBoard = (id, updates) => ({
  type: "EDIT_BOARD",
  id,
  updates,
});

export const removeBoard = id => ({
  type: "REMOVE_BOARD",
  id,
});
