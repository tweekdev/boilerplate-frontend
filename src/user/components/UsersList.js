import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UsersList.css';

function customCheckbox(theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.type === 'light' ? '#2d3980' : '#2d3980'
      }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#2d3980',
      borderColor: '#2d3980',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #2d3980',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#2d3980',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  };
}
function CustomPagination(props) {
  const { state, api } = props;

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page}
      count={state.pagination.pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => api.current.setPage(value)}
    />
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    backgroundColor: '#030D44',
    color: '#f8f8fa',
    fontFamily: ['Roboto'].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#2d3980',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.type === 'light' ? '#1d2761' : '#1d2761'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.type === 'light' ? '#1d2761' : '#1d2761'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color: '#f8f8fa',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    ...customCheckbox(theme),
  },
}));
const UsersList = (props) => {
  const classes = useStyles();

  const [data, setdata] = useState([]);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  CustomPagination.propTypes = {
    /**
     * ApiRef that let you manipulate the grid.
     */
    api: PropTypes.shape({
      current: PropTypes.object.isRequired,
    }).isRequired,
    /**
     * The GridState object containing the current grid state.
     */
    state: PropTypes.object.isRequired,
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };
  const columns: ColDef[] = [
    {
      field: 'pseudo',
      headerName: 'pseudo',
      width: 240,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'name',
      headerName: 'name',
      width: 250,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'firstname',
      headerName: 'firstname',
      width: 250,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'email',
      headerName: 'email',
      width: 250,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'role',
      headerName: 'role',
      width: 100,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: function (params: role) {
        if (params.value === 'user') {
          //mark police cells as red
          return ` easy-admin`;
        } else if (params.value === 'admin') {
          return ` hard-admin`;
        }
        return null;
      },
    },
    {
      field: 'countTabs',
      headerName: 'Tabs',
      width: 70,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'countTutorials',
      headerName: 'Tutorials',
      width: 70,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'id',
      headerName: 'Actions',
      renderCell: (params: id) => (
        <strong>
          <div className="users-item__actions">
            <Link to={`/users/edit/${params.value}`}>
              <button className="act">
                <EditIcon></EditIcon>
              </button>
            </Link>
          </div>
        </strong>
      ),
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
  ];

  useEffect(() => {
    props.users.map((user) =>
      setdata((arr) => [
        ...arr,
        {
          id: user.id,
          pseudo: user.pseudo,
          name: user.name,
          firstname: user.firstname,
          email: user.email,
          role: user.role[0].name,
          countTabs: user.tabs.length,
          countTutorials: user.tutorials.length,
        },
      ])
    );
  }, [props.users]);
  return (
    <div className="users-content-admin">
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={classes.root} style={{ width: '100%' }}>
          <DataGrid
            className={classes.root}
            rows={data}
            columns={columns}
            showToolbar
            checkboxSelection
            pageSize={10}
            autoHeight
            loading={data.length === 0}
            columnBuffer={2}
            components={{
              Toolbar: GridToolbar,
              Pagination: CustomPagination,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
