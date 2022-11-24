const SelectService = ({ handleChange, dbServices }) => {
  return (
    <select
      onChange={handleChange}
      className="input select"
      name="selectedService"
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
  );
};

export default SelectService;
