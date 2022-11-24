const Fullname = ({ handleChange }) => {
  return (
    <>
      <input
        onChange={handleChange}
        className="input"
        name="firstName"
        type="text"
        placeholder="First name"
      />
      <input
        onChange={handleChange}
        className="input"
        name="lastName"
        type="text"
        placeholder="Last name"
      />
      <span className="form-err-msg">Please enter your full name</span>
    </>
  );
};

export default Fullname;
