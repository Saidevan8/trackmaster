import React from 'react';
import { ViewState, AuthState } from '../types';
import { LogOut, LayoutDashboard, PieChart, Home, CalendarSearch } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  auth: AuthState;
  setView: (view: ViewState) => void;
  currentView: ViewState;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ auth, setView, currentView, onLogout }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer gap-3" onClick={() => setView(auth.isAuthenticated ? 'DASHBOARD' : 'HOME')}>
            <Logo className="h-9 w-9 shadow-sm" />
            <span className="text-xl font-bold text-gray-800 hidden sm:block tracking-tight">TrackMaster</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {auth.isAuthenticated ? (
              <>
                <button
                  onClick={() => setView('DASHBOARD')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'DASHBOARD' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <LayoutDashboard size={18} className="mr-1.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button
                  onClick={() => setView('HISTORY')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'HISTORY' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <CalendarSearch size={18} className="mr-1.5" />
                  <span className="hidden sm:inline">History</span>
                </button>
                <button
                  onClick={() => setView('REPORTS')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'REPORTS' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <PieChart size={18} className="mr-1.5" />
                  <span className="hidden sm:inline">Reports</span>
                </button>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 hidden md:block">Hi, {auth.user?.username}</span>
                    <button
                        onClick={onLogout}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setView('HOME')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    currentView === 'HOME' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <Home size={18} className="mr-1.5" />
                  Home
                </button>
                <button
                    onClick={() => setView('LOGIN')}
                    className="text-gray-600 hover:text-emerald-600 font-medium px-3 py-2"
                >
                    Login
                </button>
                <button
                    onClick={() => setView('SIGNUP')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-shadow shadow-sm"
                >
                    Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
