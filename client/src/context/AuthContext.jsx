import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password, role);
      if (res.success) {
        setUser(res.user);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const switchRole = (newRole) => {
    let mockUser = { ...user, role: newRole };
    if (newRole === 'patient') {
      mockUser = { id: 'pat-201', name: 'Rohan Verma', email: 'rohan.verma@example.com', role: 'patient' };
    } else if (newRole === 'doctor') {
      mockUser = { id: 'doc-101', name: 'Dr. Arjun Kumar', email: 'arjun.k@apexhealth.com', role: 'doctor' };
    } else if (newRole === 'admin') {
      mockUser = { id: 'admin-1', name: 'System Administrator', email: 'admin@bookadoctor.com', role: 'admin' };
    }
    setUser(mockUser);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        role: user ? user.role : 'guest',
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
