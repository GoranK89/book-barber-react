const SelectBarber = ({ onChange, barberArr }) => {
  return (
    <select
      onChange={onChange}
      className="input select"
      name="selectedBarber"
      defaultValue={'default'}
    >
      <option value="default" disabled>
        Select barber
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
