import { useState, useEffect } from 'react';

const SelectService = ({ onChange, serviceArr, barberPicked }) => {
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
      name="selectedService"
      defaultValue={'default'}
    >
      <option value="default" disabled>
        {width > breakPoint ? ' Select service' : 'Service'}
      </option>
      {barberPicked != '' ? (
        serviceArr.map(service => (
          <option key={service?.id} value={service?.name}>
            {service?.name}
          </option>
        ))
      ) : (
        <option disabled className="form-err-msg">
          First select a barber
        </option>
      )}
    </select>
  );
};

export default SelectService;
