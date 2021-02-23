import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ExploreLastTutorial.css';
function ExploreLastTutorial() {
  const [tutorials, setTutorials] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchLastTutorials = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tutorials/last`
        );
        setTutorials(responseData.tutorials);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLastTutorials();
  }, [sendRequest]);
  return (
    <div className="explore-last">
      <div className="header-last">
        <h2>Les derniers tutoriels</h2>
      </div>
      <div className="card-content-last">
        <Card className="last-card rock">
          <div className="list-music-last">
            <table>
              <tbody>
                {tutorials &&
                  tutorials.map((song) => (
                    <tr key={song.id}>
                      <td>
                        <Link to={`/tutorial/${song.id}`}>{song.name}</Link>
                      </td>
                      <td>
                        <Link to={`/tutorial/${song.id}`}>{song.chanteur}</Link>
                      </td>
                      <td>
                        <Link to={`/tutorial/${song.id}`}>
                          {song.instrument.name}
                        </Link>
                      </td>
                      <td className="last-col">
                        <Link to={`/tutorial/${song.id}`}>
                          {song.type.name}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ExploreLastTutorial;
