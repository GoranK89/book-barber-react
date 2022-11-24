const SelectBarber = ({ setBarber, dbBarbers }) => {
  return (
    <>
      <select
        onChange={e => setBarber(e.target.value)}
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
          >{`${barber?.firstName} ${barber?.lastName}`}</option>
        ))}
      </select>
      <span className="form-err-msg">Please select a barber</span>
    </>
  );
};

// remember: add default props

export default SelectBarber;
