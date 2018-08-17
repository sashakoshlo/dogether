import { createStore, combineReducers } from 'redux';
import projectsReducer from '../reducers/projects';
import boardsReducer from '../reducers/boards';
import tasksREducer from '../reducers/tasks';
import selectedReducer from '../reducers/filters/selected';

export default () => {
  const store = createStore(
    combineReducers({
      projects: projectsReducer,
      boards: boardsReducer,
      tasks: tasksREducer,
      selected: selectedReducer,
    }),
  );
  return store;
};
