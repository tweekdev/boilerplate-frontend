import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import InstrumentItem from './InstrumentItem';
import './InstrumentList.css';

const InstrumentList = (props) => {
  const [searchTerm, setSeachTerm] = useState('');
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No instruments found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="instruments-content">
      <input
        className="form-control search-instrument"
        type="text"
        placeholder="recherche"
        onChange={(e) => setSeachTerm(e.target.value)}
      ></input>
      <div className="instruments-list">
        {props.items
          .filter((val) => {
            if (searchTerm === '') {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((instrument) => (
            <InstrumentItem
              key={instrument.id}
              id={instrument.id}
              name={instrument.name}
            />
          ))}
      </div>
    </div>
  );
};

export default InstrumentList;
