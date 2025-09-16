import './App.css';
import { Button } from './components/ui/button';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ThemeProvider } from './components/theme-provider';
import Auth from './pages/Auth';
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
