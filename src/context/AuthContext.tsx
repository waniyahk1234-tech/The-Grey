import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (passcode: string) => boolean;
  logout: () => void;
  staffUser: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Secret management passcodes (case-insensitive)
const VALID_PASSCODES: Record<string, string> = {
  nathiagali123: 'Staff & Admin Team',
  grey2026: 'The Grey Management',
  thegrey: 'Host Desk',
  nathia: 'Nathia Gali Operations',
  admin123: 'Duty Manager',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // CRITICAL: Always default to false on every fresh app load or refresh so it NEVER opens unprotected
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [staffUser, setStaffUser] = useState<string | null>(null);

  // Clear any existing session token on initial mount to guarantee a fresh password prompt
  useEffect(() => {
    try {
      sessionStorage.removeItem('the_grey_admin_auth');
      sessionStorage.removeItem('the_grey_admin_user');
      localStorage.removeItem('the_grey_admin_auth');
      localStorage.removeItem('the_grey_admin_user');
    } catch {}
  }, []);

  const login = (passcode: string): boolean => {
    const cleaned = passcode.trim().toLowerCase();
    if (VALID_PASSCODES[cleaned]) {
      const roleName = VALID_PASSCODES[cleaned];
      setIsAuthenticated(true);
      setStaffUser(roleName);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setStaffUser(null);
    try {
      sessionStorage.removeItem('the_grey_admin_auth');
      sessionStorage.removeItem('the_grey_admin_user');
      localStorage.removeItem('the_grey_admin_auth');
      localStorage.removeItem('the_grey_admin_user');
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, staffUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
