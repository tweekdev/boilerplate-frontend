import AddIcon from '@material-ui/icons/Add';
import 'netslider/dist/styles.min.css';
import React, { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ListTabByInstrument.css';

const ListTabByInstrument = (props) => {
  const { sendRequest } = useHttpClient();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [loadedTabsByInstrument, setLoadedTabsByInstrument] = useState();

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs/allByInstrumentId/${props.id}`
        );
        console.log(responseData.tabs);
        setLoadedTabsByInstrument(responseData.tabs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTabs();
  }, [sendRequest, props.id]);

  return (
    <>
      {loadedTabsByInstrument && (
        <div key={props.id} className="main-tabs-instru">
          <div className="instru-carou">
            <div className="header-instrument-slide">
              <Link to={`/instruments/${props.id}`}>
                <h2>{props.name}</h2>
              </Link>
              <Link to={`/instruments/${props.id}`}>
                <AddIcon className="btn-active-seach" />
              </Link>
            </div>
            <Slider {...settings}>
              {loadedTabsByInstrument &&
                loadedTabsByInstrument.map((tab) => (
                  <Card key={tab.id} className="single-instrument">
                    <Link to={`/tab/${tab.id}`}>
                      <div className="header-single-instrument">
                        <Link
                          className="link-datas-instru"
                          to={`/tab/${tab.id}`}
                        >
                          {tab.name}
                          <br />
                          {tab.chanteur}
                        </Link>
                        <div className="content-single-instrument">
                          <label>Difficulty</label>
                          {tab.difficulty.name === 'easy' ? (
                            <h4 className="dif easy">{tab.difficulty.name}</h4>
                          ) : tab.difficulty.name === 'medium' ? (
                            <h4 className="dif medium">
                              {tab.difficulty.name}
                            </h4>
                          ) : tab.difficulty.name === 'hard' ? (
                            <h4 className="dif hard">{tab.difficulty.name}</h4>
                          ) : null}

                          <label>Type</label>
                          <h4 className="dif">{tab.type.name}</h4>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default ListTabByInstrument;
