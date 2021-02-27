import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import alan from '../../assets/image/alan.png';
import greenday from '../../assets/image/greenday.png';
import queen from '../../assets/image/queenre.png';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ExploreType.css';
function ExploreType() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedRock, setLoadRock] = useState();
  const [loadedPunk, setLoadPunk] = useState();
  const [loadedPop, setLoadPop] = useState();

  useEffect(() => {
    const fetchTabsRock = async () => {
      try {
        const responseData = await sendRequest(
          `/api/tweektabs/tabs/type/601931d35dc3ee2e0f4edb79`
        );
        setLoadRock(responseData.tabs);
      } catch (err) {}
    };
    const fetchTabsPunk = async () => {
      try {
        const responseData = await sendRequest(
          `/api/tweektabs/tabs/type/601932c1fbf5a82f69a7873e`
        );
        setLoadPunk(responseData.tabs);
      } catch (err) {}
    };
    const fetchTabsPop = async () => {
      try {
        const responseData = await sendRequest(
          `/api/tweektabs/tabs/type/601932bcfbf5a82f69a7873d`
        );
        setLoadPop(responseData.tabs);
      } catch (err) {}
    };
    fetchTabsRock();
    fetchTabsPunk();
    fetchTabsPop();
  }, [sendRequest]);

  return (
    <div className="explore-type">
      <div className="header-type">
        <h2>Les plus visitées</h2>
      </div>
      <div className="card-content">
        <Card className="type-card rock">
          <div className="picture-description-type">
            <img src={queen} alt="" />
            <h3>rock</h3>
          </div>
          <div className="list-music-type">
            <ul>
              {loadedRock &&
                loadedRock.map((song) => (
                  <li key={song.id}>
                    <Link to={`/tab/${song.id}`}>
                      <span>{song.name} - </span>
                      <span>{song.chanteur}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Card>
        <Card className="type-card punk">
          <div className="content picture-description-type">
            <img src={greenday} alt="punk" />
            <h3>punk</h3>
          </div>
          <div className="content list-music-type">
            <ul>
              {loadedPunk &&
                loadedPunk.map((song) => (
                  <li key={song.id}>
                    <Link to={`/tab/${song.id}`}>
                      <span>{song.name} - </span>
                      <span>{song.chanteur}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Card>
        <Card className="type-card pop">
          <div className="picture-description-type">
            <img src={alan} alt="" />
            <h3>pop</h3>
          </div>
          <div className="list-music-type">
            <ul>
              {loadedPop &&
                loadedPop.map((song) => (
                  <li key={song.id}>
                    <Link to={`/tab/${song.id}`}>
                      <span>{song.name} - </span>
                      <span>{song.chanteur}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ExploreType;
