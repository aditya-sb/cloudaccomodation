import { useState, useEffect } from 'react';
import isAuthenticated, { setAuthToken } from '../utils/auth-util';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const login = (token: string) => {
    setAuthToken(token);
    setIsAuth(true);
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuth(false);
  };

  return { isAuth, login, logout };
};
