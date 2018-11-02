import { loadState } from '../localStorage';

const tasksReducerDefaultState = loadState() ? loadState().tasks : [];

export default (state = tasksReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        action.task,
      ];
    case 'EDIT_TASK':
      return state.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            ...action.updates,
          };
        }
        return task;
      });
    case 'REMOVE_TASK':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
