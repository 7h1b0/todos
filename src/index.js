import { h, render } from 'preact';
import { Provider } from 'unistore/preact';
import store from './store';
import App from './components/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body,
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
