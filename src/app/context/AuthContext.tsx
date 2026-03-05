import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTHORIZED_EMAIL = 'ramanilakshmipriya26@gmail.com';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (name: string, email: string, password: string) => {
    if (email !== AUTHORIZED_EMAIL) {
      return {
        success: false,
        message: 'Access denied. Unauthorized email.',
      };
    }

    const userData = { name, email, password };
    localStorage.setItem('credentials', JSON.stringify(userData));
    
    return {
      success: true,
      message: 'Signup successful! You can now login.',
    };
  };

  const login = (email: string, password: string) => {
    if (email !== AUTHORIZED_EMAIL) {
      return false;
    }

    const storedCredentials = localStorage.getItem('credentials');
    if (!storedCredentials) {
      return false;
    }

    const credentials = JSON.parse(storedCredentials);
    if (credentials.email === email && credentials.password === password) {
      const userData = { name: credentials.name, email: credentials.email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
