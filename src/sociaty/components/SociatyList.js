import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import SociatyItem from './SociatyItem';
import './SociatyList.css';

const SociatyList = (props) => {
  const [searchTerm, setSeachTerm] = useState('');
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No sociaties found. </h2>
        </Card>
      </div>
    );
  }
  const BarStyling = {
    width: '20rem',
    background: '#F2F1F9',
    marginLeft: '1rem',
    border: 'none',
    padding: '0.5rem',
  };
  return (
    <div className="sociaty-content">
      <div className="sociaty-list">
        <input
          style={BarStyling}
          type="text"
          placeholder="recherche"
          onChange={(e) => setSeachTerm(e.target.value)}
        ></input>
        {props.items
          .filter((val) => {
            if (searchTerm === '') {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.adresse.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((sociaty) => (
            <SociatyItem
              key={sociaty.id}
              id={sociaty.id}
              name={sociaty.name}
              adresse={sociaty.adresse}
              creatorId={sociaty.creator}
              sociatyCount={sociaty.length}
              onDelete={props.onDeleteSociaty}
            />
          ))}
      </div>
    </div>
  );
};

export default SociatyList;
