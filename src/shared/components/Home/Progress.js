import Carousel from 'nuka-carousel';
import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import '../../../index.css';

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 33rem;
  margin: 4rem;
  border-radius: 40px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.4s;
  :hover {
    transform: scale(0.9, 0.9);
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
      -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
  }
  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.7rem;
    width: 80%;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    font-size: 1.7rem;
    width: 80%;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    font-size: 1.7rem;
    width: 80%;
  }
`;
const CardImage = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 40px;
  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.7rem;
    width: 100%;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    font-size: 1.7rem;
    width: 100%;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    font-size: 1.7rem;
    width: 100%;
  }
`;
const Lien = styled.a`
  color: #d4dcff !important;
`;
const Image = styled.img`
  width: 100%;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
`;
const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: center;
  justify-content: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1.8rem;
  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: 1.7rem;
    width: 100%;
    display: none;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    font-size: 1.7rem;
    width: 100%;
    display: none;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    font-size: 1.7rem;
    width: 100%;
    display: none;
  }
`;

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      progress: [],
    };
  }

  async componentDidMount() {
    await axios
      .get('http://localhost:5000/course')
      .then((response) => {
        console.log(response);
        this.setState({ progress: response.data, isLoaded: true });
        //this.setState({name: response.data.name}); NE PAS OUBLIER DE VISEE LE DATA POUR RECUPERER LES DATAS
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    const { isLoaded, progress = [] } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Carousel
          autoplayInterval={3000}
          withoutControls={true}
          slidesToScroll="auto"
          edgeEasing="easeOutCirc"
          autoplay={true}
          speed={2000}
          slidesToShow={1}
          slideIndex={0}
          style={{
            height: '40rem',
          }}
        >
          {progress &&
            progress.map(
              (item) => (
                <Card key={item._id}>
                  <CardImage>
                    <Image src={item.image}></Image>
                  </CardImage>
                  <CardTitle>
                    <Lien href={item.lien}>{item.libelle}</Lien>
                    <ProgressBar
                      style={{
                        backgroundColor: '#222',
                        height: '1.5rem',
                        borderRadius: '1em',
                        width: '100%',
                        marginTop: '3rem',
                      }}
                      label={item.pourcentage + '%'}
                      striped={false}
                      now={item.pourcentage}
                    ></ProgressBar>
                  </CardTitle>
                </Card>
              ),
              console.log(this.state.progress)
            )}
        </Carousel>
      );
    }
  }
}
export default Progress;
