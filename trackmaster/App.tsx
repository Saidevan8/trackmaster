import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { History } from './pages/History';
import { AuthState, ViewState, User } from './types';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [init, setInit] = useState(false);

  useEffect(() => {
    // Check for existing session
    const user = storageService.getCurrentUser();
    if (user) {
      setAuth({ isAuthenticated: true, user });
      // If we are on root or auth pages, go to dashboard
      setCurrentView('DASHBOARD');
    }
    setInit(true);
  }, []);

  const handleLoginSuccess = (user: User) => {
    setAuth({ isAuthenticated: true, user });
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    storageService.logout();
    setAuth({ isAuthenticated: false, user: null });
    setCurrentView('HOME');
  };

  if (!init) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <Navbar 
        auth={auth} 
        setView={setCurrentView} 
        currentView={currentView} 
        onLogout={handleLogout} 
      />

      <main className="flex-grow">
        {currentView === 'HOME' && <Home setView={setCurrentView} />}
        
        {currentView === 'LOGIN' && (
            <Login onLoginSuccess={handleLoginSuccess} setView={setCurrentView} />
        )}
        
        {currentView === 'SIGNUP' && (
            <Signup onLoginSuccess={handleLoginSuccess} setView={setCurrentView} />
        )}
        
        {currentView === 'DASHBOARD' && auth.user && (
            <Dashboard user={auth.user} />
        )}

        {currentView === 'HISTORY' && auth.user && (
            <History user={auth.user} />
        )}

        {currentView === 'REPORTS' && auth.user && (
            <Reports user={auth.user} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
                &copy; 2024 TrackMaster. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-medium">v1.0.0</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;