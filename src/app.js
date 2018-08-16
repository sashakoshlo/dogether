import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import DogetherApp from './components/DogetherApp';
import configureStore from './store/configureStore';
import { addProject, editProject, removeProject } from './actions/projects';

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

const project1 = store.dispatch(addProject('Project 1'));
store.dispatch(addProject('Project 2'));
store.dispatch(addProject('Project 3'));
//store.dispatch(removeProject(project1.project.id));
store.dispatch(editProject(project1.project.id, {name: 'Project33'}))
 
ReactDOM.render(<DogetherApp />, document.getElementById('app'));