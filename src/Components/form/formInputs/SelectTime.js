const SelectTime = ({ onChange, barberPicked, datePicked }) => {
  // IN PROGRESS
  const selectHours = [];
  const selectMinutes = [];
  const workHours = () => {
    const startHour = 7;
    const endHour = 15;

    for (let i = startHour; i <= endHour; i++) {
      selectHours.push(i);
    }
    for (let j = 5; j <= 60; j += 5) selectMinutes.push(j);
  };
  workHours();

  return (
    <select
      onChange={onChange}
      defaultValue={'default'}
      className="input select"
      name="selectedTime"
    >
      <option value="default" disabled>
        Select time
      </option>
      {barberPicked && datePicked ? (
        selectHours?.map((h, i) => (
          <option key={i} value={h}>
            {h}
          </option>
        ))
      ) : (
        <option disabled className="form-err-msg">
          First select a date
        </option>
      )}
    </select>
  );
};

export default SelectTime;
