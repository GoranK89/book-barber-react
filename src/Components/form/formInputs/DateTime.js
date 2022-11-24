const DateTime = ({ setDate, setTime }) => {
  return (
    <>
      <input
        onChange={e => setDate(e.target.value)}
        className="input"
        name="selectdate"
        type="date"
      />
      <span className="form-err-msg">Please pick a date</span>
      <select
        onChange={e => setTime(e.target.value)}
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
