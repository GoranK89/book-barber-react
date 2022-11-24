const SelectService = ({ setService, dbServices }) => {
  return (
    <>
      <select
        onChange={e => setService(e.target.value)}
        className="input select"
        name="selectservice"
        defaultValue={'default'}
      >
        <option value="default" disabled>
          Select service
        </option>
        {dbServices.map(service => (
          <option key={service?.id}>{service?.name}</option>
        ))}
      </select>
      <span className="form-err-msg">Please select a service</span>
    </>
  );
};

export default SelectService;
