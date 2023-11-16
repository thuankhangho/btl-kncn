import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Input from './components/input.tsx';
import FlashcardApp from './components/flashcard.jsx';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Input />} />
			<Route path="flashcard" element={<FlashcardApp />} />
		</Routes>
	</BrowserRouter>
);
export default App;