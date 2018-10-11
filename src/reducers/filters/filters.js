const defaultFiltersState = {
  closedTasksVisible: false
}

export default (state = defaultFiltersState, action) => {
  switch (action.type) {
    case 'TOGGLE_CLOSED_TASKS':
      return {
        ...state,
        closedTasksVisible: action.closedTasksVisible
      }
    default:
      return state;
  }
}
