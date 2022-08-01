import Container from '../Container/Container';
import App from './App';

const container = new Container();
const app: App = new App(container);

export { app, container };
