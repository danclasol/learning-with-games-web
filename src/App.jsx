import Layout from './components/layout/Layout.jsx';
import Navigation from './components/layout/Navigation.jsx';
import { AuthContextProvider } from './lib/context/AuthContext.jsx';

const App = () => {
	return (
		<AuthContextProvider>
			<Layout>
				<Navigation />
			</Layout>
		</AuthContextProvider>
	);
};

export default App;
