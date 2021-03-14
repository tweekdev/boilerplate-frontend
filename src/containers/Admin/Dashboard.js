import React from 'react';
import CounterUsers from './Counter/CounterUsers';
import './Dashboard.css';
import LastUsers from './LastAdded/LastUsers';
function Dashboard(props) {
  return (
    <div className="main-dashboard">
      <div className="main-counter">
        {props.users && <CounterUsers count={props.users.length} />}
      </div>
      <div className="last-added">
        {props.tabs && <LastUsers users={props.users} />}
      </div>
    </div>
  );
}

export default Dashboard;
