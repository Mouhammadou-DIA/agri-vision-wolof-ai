
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerRootComponent } from 'expo';

// Create root and render for web
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

// Register the main component for Expo
registerRootComponent(App);
