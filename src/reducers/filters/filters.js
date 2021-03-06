const defaultFiltersState = {
  closedTasksVisible: false,
  text: ''
}

export default (state = defaultFiltersState, action) => {
  switch (action.type) {
    case 'TOGGLE_CLOSED_TASKS':
      return {
        ...state,
        closedTasksVisible: action.closedTasksVisible
      };
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
}
