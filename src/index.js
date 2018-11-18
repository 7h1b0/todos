import { h, render } from 'preact';
import App from './components/App';
import registerServiceWorker from './registerSW';

render(<App />, document.body);
registerServiceWorker();
