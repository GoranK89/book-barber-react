const SelectService = ({ handleChange, dbServices }) => {
  return (
    <>
      <select
        onChange={handleChange}
        className="input select"
        name="selectservice"
        defaultValue={'default'}
      >
        <option value="default" disabled>
          Select service
        </option>
        {dbServices.map(service => (
          <option key={service?.id} value={service?.name}>
            {service?.name}
          </option>
        ))}
      </select>
      <span className="form-err-msg">Please select a service</span>
    </>
  );
};

export default SelectService;
