const SelectTime = ({ onChange, arr }) => {
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
  console.log();

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
      {arr?.map(hours => (
        <option key={hours.id} value={hours.startHour}>
          {hours.startHour}
        </option>
      ))}
    </select>
  );
};

export default SelectTime;
