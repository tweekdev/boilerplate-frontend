import { useCallback, useEffect, useState } from 'react';
let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [role, setRole] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, role, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setRole(role);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        role: role,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(token);
    setTokenExpirationDate(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem('userData');
  }, [token]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.role,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, role };
};
