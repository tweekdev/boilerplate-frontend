import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinksLeft.css';
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const [instruments, setInstruments] = useState();

  useEffect(() => {
    const fetchLastInstruments = async () => {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/instruments`)
          .then((response) => response.json())
          .then((result) => setInstruments(result.instruments));
      } catch (err) {
        console.log(err);
      }
    };
    fetchLastInstruments();
  }, []);
  return (
    <ul className="nav-links-left">
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink className="links" to="/">
              <HomeIcon className="icon-header"></HomeIcon> Accueil
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/explore">
              <DashboardIcon className="icon-header"></DashboardIcon> Explore
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/tabs">
              <QueueMusicIcon className="icon-header"></QueueMusicIcon> Tabs
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/tutorial">
              <YouTubeIcon className="icon-header"></YouTubeIcon> Tutoriels
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/Instruments" exact>
              <MusicNoteIcon className="icon-header"></MusicNoteIcon>
              Instruments
            </NavLink>
          </li>

          <div className="instrument-left">
            Instruments
            <ul>
              {instruments &&
                instruments.map((instrument, i) => (
                  <NavLink
                    key={instrument.id}
                    className="links"
                    to={`/instruments/${instrument.id}`}
                  >
                    <QueueMusicIcon className="icon-header"></QueueMusicIcon>
                    {instrument.name}
                  </NavLink>
                ))}
            </ul>
          </div>
        </>
      )}
      {auth.isLoggedIn && auth.role === '601724ea6f33a7db18a485c5' && (
        <div className="instrument-left">
          Administration
          <li>
            <NavLink className="links" to="/admin" exact>
              <SupervisorAccountIcon className="icon-header"></SupervisorAccountIcon>
              Panel Admin
            </NavLink>
          </li>
        </div>
      )}
      {!auth.isLoggedIn && (
        <>
          <li>
            <NavLink className="links" to="/">
              <HomeIcon className="icon-header"></HomeIcon> Accueil
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/explore">
              <DashboardIcon className="icon-header"></DashboardIcon> Explore
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/tabs">
              <QueueMusicIcon className="icon-header"></QueueMusicIcon> Tabs
            </NavLink>
          </li>
          <li>
            <NavLink className="links" to="/tutorial">
              <YouTubeIcon className="icon-header"></YouTubeIcon> Tutoriels
            </NavLink>
          </li>
          <div className="instrument-left">
            Instruments
            <ul>
              {instruments &&
                instruments.map((instrument, i) => (
                  <NavLink
                    key={instrument.id}
                    className="links"
                    to={`/instruments/${instrument.id}`}
                  >
                    <QueueMusicIcon className="icon-header"></QueueMusicIcon>
                    {instrument.name}
                  </NavLink>
                ))}
            </ul>
          </div>
        </>
      )}
    </ul>
  );
};

export default NavLinks;