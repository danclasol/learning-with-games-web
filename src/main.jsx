import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

const container = ReactDOM.createRoot(document.getElementById('root'));

container.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
