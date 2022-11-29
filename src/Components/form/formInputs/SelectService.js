const SelectService = ({ onChange, serviceArr }) => {
  return (
    <select
      onChange={onChange}
      className="input select"
      name="selectedService"
      defaultValue={'default'}
    >
      <option value="default" disabled>
        Select service
      </option>
      {serviceArr.map(service => (
        <option key={service?.id} value={service?.name}>
          {service?.name}
        </option>
      ))}
    </select>
  );
};

export default SelectService;
