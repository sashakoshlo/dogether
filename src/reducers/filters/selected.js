const defaultSelectedState = {
  selectedProject: undefined,
  selectedTask: {},
};

export default (state = defaultSelectedState, action) => {
  switch (action.type) {
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProject: action.projectId,
      };
    case 'SELECT_TASK':
      return {
        ...state,
        selectedTask: action.task,
      };
    default:
      return state;
  }
};
