import uuid from "uuid";

export const addProject = name => ({
  type: "ADD_PROJECT",
  project: {
    id: uuid(),
    name,
  },
});

// Usage: updates should be an object with properties your are changing
export const editProject = (id, name) => ({
  type: "EDIT_PROJECT",
  id,
  updates: {
    name,
  },
});

export const removeProject = id => ({
  type: "REMOVE_PROJECT",
  id,
});
