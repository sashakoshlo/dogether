import { createStore, combineReducers } from 'redux';
import projectsReducer from '../reducers/projects';
import boardsReducer from '../reducers/boards';
import tasksReducer from '../reducers/tasks';
import selectedReducer from '../reducers/filters/selected';
import uiReducer from '../reducers/ui';

export default () => {
  const store = createStore(
    combineReducers({
      projects: projectsReducer,
      boards: boardsReducer,
      tasks: tasksReducer,
      selected: selectedReducer,
      ui: uiReducer,
    }),
  );
  return store;
};
