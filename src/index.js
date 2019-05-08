import { h, render } from 'preact';
import App from './components/App';

render(<App />, document.body);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
