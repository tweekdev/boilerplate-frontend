import { XGrid } from '@material-ui/x-grid';
import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UserItem.css';

const UserItem = (props) => {
  const { isLoading, error, clearError } = useHttpClient();
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="users-item">
        <Card className="users-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div style={{ height: 400, width: '100%' }}>
            <XGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserItem;
