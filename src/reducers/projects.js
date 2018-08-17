const projectsReducerDefaultState = [];

export default (state = projectsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [
        ...state,
        action.project,
      ];
    case 'EDIT_PROJECT':
      return state.map((project) => {
        if (project.id === action.id) {
          return {
            ...project,
            ...action.updates,
          };
        }
        return project;
      });
    case 'REMOVE_PROJECT':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
