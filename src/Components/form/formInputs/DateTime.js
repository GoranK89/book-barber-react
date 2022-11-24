const DateTime = ({ handleChange }) => {
  return (
    <>
      <input
        onChange={handleChange}
        className="input"
        name="selectdate"
        type="date"
      />
      <span className="form-err-msg">Please pick a date</span>
      <select
        onChange={handleChange}
        className="input select"
        name="selecttime"
      >
        <option>7:00</option>
        <option>15:00</option>
      </select>
      <span className="form-err-msg">Please pick a time</span>
    </>
  );
};

export default DateTime;
