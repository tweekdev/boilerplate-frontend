import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import './InstrumentList.css';
import ListTabByInstrument from './ListTabByInstrument';

const InstrumentList = (props) => {
  const [searchTerm, setSeachTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="instruments-content">
      <div className="descritif-instruments">
        <h1>
          Toutes les <strong>tabs</strong>
        </h1>
        <p>
          Envie d'apprendre et maitriser de nouvelles musiques par le biais de
          tablatures ? Alors vous êtes sur le bon chemin...
        </p>
      </div>
      <div className="header-search">
        {isVisible && (
          <div className="search-container">
            <input
              className="form-control search-tabs search1"
              type="text"
              placeholder="recherche"
              onChange={(e) => setSeachTerm(e.target.value)}
            ></input>
          </div>
        )}
        <div className="search-active">
          <button
            className="btn-active-seach"
            onClick={() => setIsVisible(!isVisible)}
          >
            <SearchIcon/>
          </button>
        </div>
      </div>

      <div className="instruments-list">
        {props.items &&
          props.items
            .filter((val) => {
              if (searchTerm === '') {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((instrument, i) => (
              <ListTabByInstrument
                key={instrument.id}
                name={instrument.name}
                id={instrument.id}
              ></ListTabByInstrument>
            ))}
      </div>
    </div>
  );
};

export default InstrumentList;
