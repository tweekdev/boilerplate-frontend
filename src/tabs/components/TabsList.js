import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import TabsItem from './TabsItem';
import './TabsList.css';

const TabsList = (props) => {
  const auth = useContext(AuthContext);
  const [searchTerm, setSeachTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const dif = [
    ...new Map(
      props.items.map((item) => [
        JSON.stringify(item.difficulty.name),
        item.difficulty.name,
      ])
    ).values(),
  ];
  const type = [
    ...new Map(
      props.items.map((item) => [
        JSON.stringify(item.type.name),
        item.type.name,
      ])
    ).values(),
  ];
  const instrument = [
    ...new Map(
      props.items.map((item) => [
        JSON.stringify(item.instrument.name),
        item.instrument.name,
      ])
    ).values(),
  ];

  return (
    <div className="tabs-content">
      <div className="header-search">
        {isVisible && (
          <div className="search-container">
            <input
              className="form-control search-tabs search1"
              type="text"
              placeholder="recherche"
              onChange={(e) => setSeachTerm(e.target.value)}
            ></input>
            <select
              className="form-control search-tabs "
              onChange={(e) => setSeachTerm(e.target.value)}
            >
              <option value="">difficulty :</option>
              {dif.map((tab, i) => (
                <option key={i} value={tab}>
                  {tab}
                </option>
              ))}
            </select>
            <select
              className="form-control search-tabs "
              onChange={(e) => setSeachTerm(e.target.value)}
            >
              <option value="">Type :</option>
              {type.map((tab, i) => (
                <option key={i} value={tab}>
                  {tab}
                </option>
              ))}
            </select>
            <select
              className="form-control search-tabs "
              onChange={(e) => setSeachTerm(e.target.value)}
            >
              <option value="">Instrument :</option>
              {instrument.map((tab, i) => (
                <option key={i} value={tab}>
                  {tab}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="search-active">
          <button
            className="btn-active-seach"
            onClick={() => setIsVisible(!isVisible)}
          >
            <SearchIcon></SearchIcon>
          </button>
        </div>
      </div>

      {auth.isLoggedIn && (
        <div className="add-new-container">
          <Link to={'/tabs/new'}>
            <AddIcon></AddIcon>
          </Link>
        </div>
      )}

      <div className="tabs-list">
        <div className="descritif-tabs">
          <h1>
            Toutes les <strong>tablatures</strong>
          </h1>
          <p>
            Envie d'apprendre et maitriser de nouvelles musiques par le biais de
            tablatures ? Alors vous êtes sur le bon chemin...
          </p>
        </div>
        {props.items
          .filter((val) => {
            if (searchTerm === '') {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.chanteur.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.instrument.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.type.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.difficulty.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((tab) => (
            <TabsItem
              key={tab.id}
              id={tab.id}
              name={tab.name}
              chanteur={tab.chanteur}
              difficulty={tab.difficulty}
              type={tab.type}
              instrument={tab.instrument}
              file={tab.file}
            />
          ))}
      </div>
    </div>
  );
};

export default TabsList;
