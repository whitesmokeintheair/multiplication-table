import './App.css';
import { TablePage } from './pages/TablePage';
import { MatrixProvider } from './providers/MatrixContextProvider';

function App() {
	return (
		<div className='App'>
			<header className='App-header'></header>
			<MatrixProvider>
				<TablePage />
			</MatrixProvider>
		</div>
	);
}

export default App;
