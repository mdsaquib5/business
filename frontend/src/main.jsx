import { createRoot } from 'react-dom/client';
import './fonts/inter.css';
import './styles/layout.css';
import './styles/global.css';
import './styles/responsive.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
)