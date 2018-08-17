import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Provider from 'react-redux';
import DogetherApp from './components/DogetherApp';
import configureStore from './store/configureStore';

const store = configureStore();
store.subscribe(() => {
  console.log(store.getState());
});

const jsx = (
  <Provider store={store}>
    <DogetherApp />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
