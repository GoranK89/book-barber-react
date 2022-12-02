import { useState, useEffect } from 'react';

const SelectBarber = ({ onChange, barberArr }) => {
  const breakPoint = 515;
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
  }, [width]);

  return (
    <select
      onChange={onChange}
      className="input select"
      name="selectedBarber"
      defaultValue={'default'}
    >
      <option value="default" disabled>
        {width > breakPoint ? ' Select barber' : 'Barber'}
      </option>
      {barberArr.map(barber => (
        <option
          key={barber?.id}
          value={`${barber?.firstName} ${barber?.lastName}`}
        >{`${barber?.firstName} ${barber?.lastName}`}</option>
      ))}
    </select>
  );
};

export default SelectBarber;
