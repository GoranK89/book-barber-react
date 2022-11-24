const SelectBarber = ({ handleChange, dbBarbers }) => {
  return (
      <select
        onChange={handleChange}
        className="input select"
        name="selectedBarber"
        defaultValue={'default'}
      >
        <option value="default" disabled>
          Select barber
        </option>
        {dbBarbers.map(barber => (
          <option
            key={barber?.id}
            value={`${barber?.firstName} ${barber?.lastName}`}
          >{`${barber?.firstName} ${barber?.lastName}`}</option>
        ))}
      </select>
  );
};

export default SelectBarber;
