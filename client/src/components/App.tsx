import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Input from './input.tsx';
import FlashcardApp from './flashcard.tsx';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Input />} />
			<Route path="flashcard" element={<FlashcardApp />} />
		</Routes>
	</BrowserRouter>
);
export default App;