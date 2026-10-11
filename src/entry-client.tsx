import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/main.css';

const container = document.getElementById('root');
if (!container) throw new Error('Elemento #root não encontrado no index.html');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// No build, o HTML já vem pronto dentro do #root (prerender) e o React só "assume" o que
// existe (hydrate). No `npm run dev` o #root vem vazio, então é preciso renderizar do zero.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
