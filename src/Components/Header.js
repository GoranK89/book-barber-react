import { useState, useEffect } from 'react';

const Header = () => {
  // Keep track of window size
  const breakPoint = 515;
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
  }, [width]);

  return (
    <div className="heading-wrapper">
      <h1>Book your barber</h1>
      <p>
        {width >= breakPoint
          ? "Great hair doesn't happen by chance. It happens by appointment! So don't wait and book your appointment now!"
          : "Great hair doesn't happen by chance. It happens by appointment!"}
      </p>
    </div>
  );
};

export default Header;
