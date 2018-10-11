import { createStore, combineReducers } from 'redux';
import projectsReducer from '../reducers/projects';
import tasksReducer from '../reducers/tasks';
import filterReducer from '../reducers/filters/filters';
import selectedReducer from '../reducers/filters/selected';
import uiReducer from '../reducers/ui';

export default () => {
  const store = createStore(
    combineReducers({
      projects: projectsReducer,
      tasks: tasksReducer,
      filters: filterReducer,
      selected: selectedReducer,
      ui: uiReducer,
    }),
  );
  return store;
};
