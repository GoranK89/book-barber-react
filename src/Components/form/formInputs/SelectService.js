const SelectService = ({ onChange, serviceArr, barberPicked }) => {
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
      {barberPicked != '' ? (
        serviceArr.map(service => (
          <option key={service?.id} value={service?.name}>
            {service?.name}
          </option>
        ))
      ) : (
        <option disabled className="form-err-msg">
          First select a barber
        </option>
      )}
    </select>
  );
};

export default SelectService;
