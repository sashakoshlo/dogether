const defaultSelectedState = {
  selectedProject: {},
  selectedBoard: undefined,
  selectedTask: {},
};

export default (state = defaultSelectedState, action) => {
  switch (action.type) {
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProject: action.project,
      };
    case 'SELECT_BOARD':
      return {
        ...state,
        selectedBoard: action.id,
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
