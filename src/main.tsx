import { createRoot } from 'react-dom/client';
import './index.css';
// Shared inner-page composition and spacing primitives.
import './styles/design-system.css';
// Navigation and accessibility safeguards stay isolated from page layout.
import './styles/navigation.css';
import './styles/accessibility.css';
import App from './App';
import ErrorBoundary from './components/system/ErrorBoundary';

// Taken over before anything renders. The browser's own restoration
// runs against a document that has not been laid out yet, which is what
// makes it jump to the top and then correct itself.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The application root element was not found.');
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
