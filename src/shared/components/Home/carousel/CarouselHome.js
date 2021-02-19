import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import './CarouselHome.css';

const CarouselHome = () => {
  const [instruments, setInstruments] = useState();
  const { sendRequest } = useHttpClient();

  const colors = [
    'green',
    'orange',
    'red',
    'green',
    'orange',
    'red',
    'green',
    'orange',
    'red',
  ];

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
    <>
      <div className="home-push-content-carousel">
        <div className="carouselHome">
          <section className="contenue-carousel">
            {instruments &&
              instruments.map((instrument, i) => (
                <Link
                  key={instrument.id}
                  className={`link-datas-home-page-btn ${colors[i]} `}
                  to={`/instruments/${instrument.id}`}
                >
                  {instrument.name}
                </Link>
              ))}
          </section>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="wave-inverse"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#000638"
            fill-opacity="1"
            d="M0,64L20,85.3C40,107,80,149,120,138.7C160,128,200,64,240,64C280,64,320,128,360,160C400,192,440,192,480,208C520,224,560,256,600,240C640,224,680,160,720,122.7C760,85,800,75,840,64C880,53,920,43,960,80C1000,117,1040,203,1080,213.3C1120,224,1160,160,1200,128C1240,96,1280,96,1320,80C1360,64,1400,32,1420,16L1440,0L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="wave-inverse"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#000638"
            fill-opacity="1"
            d="M0,64L20,85.3C40,107,80,149,120,138.7C160,128,200,64,240,64C280,64,320,128,360,160C400,192,440,192,480,208C520,224,560,256,600,240C640,224,680,160,720,122.7C760,85,800,75,840,64C880,53,920,43,960,80C1000,117,1040,203,1080,213.3C1120,224,1160,160,1200,128C1240,96,1280,96,1320,80C1360,64,1400,32,1420,16L1440,0L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="wave-inverse"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#000638"
            fill-opacity="1"
            d="M0,64L20,85.3C40,107,80,149,120,138.7C160,128,200,64,240,64C280,64,320,128,360,160C400,192,440,192,480,208C520,224,560,256,600,240C640,224,680,160,720,122.7C760,85,800,75,840,64C880,53,920,43,960,80C1000,117,1040,203,1080,213.3C1120,224,1160,160,1200,128C1240,96,1280,96,1320,80C1360,64,1400,32,1420,16L1440,0L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default CarouselHome;
