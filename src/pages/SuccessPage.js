import { useState, useEffect } from 'react';
import HeroImg from '../Components/HeroImg';

const SuccessPage = () => {
  const [gif, setGif] = useState([]);
  const [rng, setRng] = useState('');

  const randomInt = () => {
    const number = Math.floor(Math.random() * 50);
    return number;
  };

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const res = await fetch(
          'http://api.giphy.com/v1/gifs/search?api_key=KeTn0RgXZQF8EDkUGgQmSaJYuWPEz5mI&q=barber'
        );
        const data = await res.json();
        setGif(data.data);
      } catch (error) {
        console.error(`Can't get GIF, ${error}`);
      }
    };

    setRng(randomInt);
    fetchGif();
  }, []);
  return (
    <main className="success-page-wrapper">
      <h2>Appointment successfully booked</h2>
      <HeroImg
        src={gif[rng]?.images.original.url}
        alt={'GIF with getting a haircut theme'}
      />
    </main>
  );
};

export default SuccessPage;
