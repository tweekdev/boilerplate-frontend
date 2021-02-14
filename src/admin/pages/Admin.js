import React from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Users.css';
const Admin = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  return (
    <div className="main-admin">
      <ErrorModal error={error} onClear={clearError} />
      <div className="admin">
        <div className="admins">
          <h3>Panel Admin</h3>
        </div>
        {isLoading && (
          <div className="center-admin">
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
