import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

const AppWarpper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      <App />
    </Context.Provider>
  );
};

const container = document.getElementById('root');
const root = container._reactRoot ?? createRoot(container);
container._reactRoot = root;

root.render(
  <StrictMode>
    <AppWarpper />
  </StrictMode>
);
