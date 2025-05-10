
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root and render for web
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

// Conditionally register the root component for Expo
// Only import Expo when we're in a native environment
if (process.env.NODE_ENV !== 'test' && !document.getElementById('root')) {
  const { registerRootComponent } = require('expo');
  registerRootComponent(App);
}
