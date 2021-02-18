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
      </div>
    </>
  );
};

export default CarouselHome;
