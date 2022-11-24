const SelectBarber = ({ handleChange, dbBarbers }) => {
  return (
    <>
      <select
        onChange={handleChange}
        className="input select"
        name="selectbarber"
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
      <span className="form-err-msg">Please select a barber</span>
    </>
  );
};

export default SelectBarber;
