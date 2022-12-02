import { useState, useEffect } from 'react';

const SelectTime = ({ onChange, barberPicked, datePicked, dbBarbers }) => {
  const breakPoint = 515;
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
  }, [width]);

  const renderAvailableTimes = () => {
    const selectedDay = datePicked?.getDay() - 1; //  -1 to match with array index
    const barbersBookedDay = dbBarbers[0]?.workHours[selectedDay]?.day;
    const barbersBookedId = dbBarbers[0]?.workHours[selectedDay]?.id;
    const barberStartHour = dbBarbers[0]?.workHours[selectedDay]?.startHour;
    const barberEndHour = dbBarbers[0]?.workHours[selectedDay]?.endHour;
    const allWorkHours = [];

    for (let i = barberStartHour; i <= barberEndHour; i++) {
      allWorkHours.push(`${i}:00`);
    }
    if (barbersBookedId <= 5) {
      return allWorkHours.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      });
    }
    if (barbersBookedId > 5) {
      return allWorkHours.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      });
    }
  };

  return (
    <select
      onChange={onChange}
      defaultValue={'default'}
      className="input select"
      name="selectedTime"
    >
      <option value="default" disabled>
        {width > breakPoint ? ' Select time' : 'Time'}
      </option>
      {barberPicked && datePicked ? (
        renderAvailableTimes()
      ) : (
        <option disabled className="form-err-msg">
          First select a date
        </option>
      )}
    </select>
  );
};

export default SelectTime;
