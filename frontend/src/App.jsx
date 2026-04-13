import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <header className="bg-white border-b border-border px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">B</span>
              </div>
              <h1 className="text-lg font-semibold text-text">BirdsEye</h1>
            </NavLink>
            <span className="text-xs text-text-muted bg-surface-alt px-2 py-0.5 rounded-full">AI Usage Intelligence</span>
            <nav className="ml-auto flex items-center gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-sm px-3 py-1.5 rounded-md transition-colors ${
                    isActive ? 'text-primary font-medium bg-primary/5' : 'text-text-muted hover:text-text hover:bg-surface-alt'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/docs"
                className={({ isActive }) =>
                  `text-sm px-3 py-1.5 rounded-md transition-colors ${
                    isActive ? 'text-primary font-medium bg-primary/5' : 'text-text-muted hover:text-text hover:bg-surface-alt'
                  }`
                }
              >
                API Docs
              </NavLink>
            </nav>
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <main className="max-w-7xl mx-auto px-6 py-6">
                <Dashboard />
              </main>
            }
          />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
