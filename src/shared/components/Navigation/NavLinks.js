import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <>
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
        </>
      )}
      {auth.isLoggedIn && auth.role === '601724ea6f33a7db18a485c5' && (
        <NavLink className="links" to="/admin" exact>
          <SupervisorAccountIcon className="icon-header"></SupervisorAccountIcon>
          Panel Admin
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <>
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
          <li>
            <NavLink to="/auth">
              <button className="button--inverse auth-button">
                Se connecter
              </button>
            </NavLink>
          </li>
        </>
      )}
      {auth.isLoggedIn && (
        <li>
          <form>
            <button className="button--inverse" onClick={auth.logout}>
              Deconnexion
            </button>
          </form>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
