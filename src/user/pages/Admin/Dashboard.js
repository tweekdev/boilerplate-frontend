import React from 'react';
import CounterTabs from './Counter/CounterTabs';
import CounterTutorials from './Counter/CounterTutorials';
import CounterUsers from './Counter/CounterUsers';
import './Dashboard.css';
import LastTabs from './LastAdded/LastTabs';
import LastTutorials from './LastAdded/LastTutorials';
import LastUsers from './LastAdded/LastUsers';
function Dashboard(props) {
  return (
    <div className="main-dashboard">
      <div className="main-counter">
        {props.tabs && <CounterTabs count={props.tabs.length} />}
        {props.tutorials && <CounterTutorials count={props.tutorials.length} />}
        {props.users && <CounterUsers count={props.users.length} />}
      </div>
      <div className="last-added">
        {props.tabs && <LastUsers users={props.users} />}
        {props.tutorials && <LastTutorials tutorials={props.tutorials} />}
        {props.tabs && <LastTabs tabs={props.tabs} />}
      </div>
    </div>
  );
}

export default Dashboard;
