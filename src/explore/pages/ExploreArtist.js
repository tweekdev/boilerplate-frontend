import React from 'react';
import alan from '../../assets/image/alan-walker.png';
import chuck from '../../assets/image/Chuck_Berry.png';
import greenday from '../../assets/image/green-day-png-clipart.png';
import marshmallow from '../../assets/image/marshmallow.png';
import queen from '../../assets/image/queen.png';
import sum41 from '../../assets/image/sum41.png';
import './ExploreArtist.css';
function ExploreArtist() {
  return (
    <div className="explore-artist">
      <div className="header-artist">
        <h2>Les artistes</h2>
      </div>
      <div className="card-content">
        <div className="artist">
          <div className="artist-card rock">
            <img src={queen} alt="" />
          </div>
          <h3>Queen</h3>
        </div>
        <div className="content artist">
          <div className="artist-card punk">
            <img src={greenday} alt="punk" />
          </div>
          <h3>Green Day</h3>
        </div>
        <div className="artist">
          <div className="artist-card pop">
            <img src={alan} alt="" />
          </div>
          <h3>Alan Walker</h3>
        </div>
        <div className="artist">
          <div className="artist-card rock">
            <img src={sum41} alt="" />
          </div>
          <h3>Sum 41</h3>
        </div>
        <div className="artist">
          <div className="artist-card punk">
            <img src={marshmallow} alt="" />
          </div>
          <h3>Marshmello</h3>
        </div>
        <div className="artist">
          <div className="artist-card pop">
            <img src={chuck} alt="" />
          </div>
          <h3>Chuck Berry</h3>
        </div>
      </div>
    </div>
  );
}

export default ExploreArtist;
