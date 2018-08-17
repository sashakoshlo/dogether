const defaultSelectedState = {
  selectedProject: undefined,
  selectedBoard: undefined,
  selectedTask: undefined,
};

export default (state = defaultSelectedState, action) => {
  switch (action.type) {
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProject: action.id,
      };
    case 'SELECT_BOARD':
      return {
        ...state,
        selectedBoard: action.id,
      };
    case 'SELECT_TASK':
      return {
        ...state,
        selectedTask: action.id,
      };
    default:
      return state;
  }
};
