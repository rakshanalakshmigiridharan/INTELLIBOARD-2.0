import { Link, useLocation } from 'react-router-dom';
import { Brain, Upload, BarChart3, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/upload', label: 'Upload CSV', icon: Upload },
    { path: '/chatbot', label: 'AI Chatbot', icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-semibold">AI Analytics</h1>
            <p className="text-xs text-gray-400">Platform</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="mb-3 px-4">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="text-sm truncate">{user?.name}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
        <Button
          onClick={logout}
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
