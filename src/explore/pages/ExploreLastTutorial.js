import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ExploreLastTutorial.css';

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function ExploreLastTutorial() {
  const classes = useStyles();
  const [tutorials, setTutorials] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchLastTutorials = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/tutorials/last`);
        setTutorials(responseData.tutorials);
      } catch (err) {}
    };
    fetchLastTutorials();
  }, [sendRequest]);
  return (
    <div className="explore-last">
      <div className="header-last">
        <h2>Les derniers tutoriels</h2>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {tutorials &&
              tutorials.map((song) => (
                <TableRow className={classes.root} key={song.id}>
                  <TableCell align="left">
                    <Link to={`/tutorial/${song.id}`}>{song.name}</Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/tutorial/${song.id}`}>{song.chanteur}</Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/tutorial/${song.id}`}>
                      {song.instrument.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/tutorial/${song.id}`}>{song.type.name}</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExploreLastTutorial;
