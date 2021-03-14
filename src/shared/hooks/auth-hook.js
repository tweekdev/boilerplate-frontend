import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
let logoutTimer;

export const useAuth = () => {
  const history = useHistory();

  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [pseudo, setPseudo] = useState(null);
  const [picture, setPicture] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback(
    (uid, token, isAdmin, pseudo, picture, expirationDate) => {
      setToken(token);
      setUserId(uid);
      setIsAdmin(isAdmin);
      setPseudo(pseudo);
      setPicture(picture);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: uid,
          token: token,
          isAdmin: isAdmin,
          pseudo: pseudo,
          picture: picture,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(token);
    setTokenExpirationDate(null);
    setUserId(null);
    setIsAdmin(null);
    setPseudo(null);
    setPicture(null);
    localStorage.removeItem('userData');
    history.push('/');
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
        storedData.isAdmin,
        storedData.pseudo,
        storedData.picture,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, isAdmin, pseudo, picture };
};
