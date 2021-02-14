import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList';
import './Users.css';
const Users = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUsers, setLoadUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setLoadUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div className="main-user">
      <ErrorModal error={error} onClear={clearError} />

      <div className="users-admin">
        <h3>Utilisateurs</h3>
      </div>
      {isLoading && (
        <div className="center-center">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </div>
  );
};

export default Users;
