import { ErrorFallback } from './components/ErrorFallback';
import { HomePage } from './pages/HomePage';
import { ErrorBoundary } from './shared/ui/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <HomePage />
    </ErrorBoundary>
  );
}
