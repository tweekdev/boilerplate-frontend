import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import TutorialsItem from './TutorialsItem';
import './TutorialsList.css';

const TutorialsList = (props) => {
  const auth = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
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
    <div className="tutorials-content">
      <div className="header-search">
        {isVisible && (
          <div className="search-container">
            <input
              className="form-control search-tabs search1"
              type="text"
              placeholder="recherche"
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <select
              className="form-control search-tabs "
              onChange={(e) => setSearchTerm(e.target.value)}
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <SearchIcon/>
          </button>
        </div>
      </div>

      {auth.isLoggedIn && (
        <div className="add-new-container">
          <Link to={'/tutorial/new'}>
            <AddIcon/>
          </Link>
        </div>
      )}
      <div className="tutorials-list">
        <div className="descritif-tutorials">
          <h1>
            Tous les <strong>tutoriels</strong>
          </h1>
          <p>
            Envie d'apprendre et maitriser de nouvelles musiques par le biais de
            videos ou tablatures ? Alors vous êtes sur le bon chemin...
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
            <TutorialsItem
              key={tab.id}
              id={tab.id}
              name={tab.name}
              chanteur={tab.chanteur}
              difficulty={tab.difficulty}
              type={tab.type}
              instrument={tab.instrument}
              link={tab.link}
              tab={tab.tab}
            />
          ))}
      </div>
    </div>
  );
};

export default TutorialsList;
