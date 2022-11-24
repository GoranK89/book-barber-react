const DateTime = ({ handleChange }) => {
  return (
    <>
      <input
        onChange={handleChange}
        className="input"
        name="selectedDate"
        type="date"
      />
      <select
        onChange={handleChange}
        className="input select"
        name="selectedTime"
      >
        <option>7:00</option>
        <option>15:00</option>
      </select>
    </>
  );
};

export default DateTime;
