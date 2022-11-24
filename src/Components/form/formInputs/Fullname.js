const Fullname = ({ handleChange }) => {
  return (
    <>
      <input
        onChange={handleChange}
        className="input"
        name="firstName"
        type="text"
        maxLength={20}
        placeholder="First name"
      />
      <input
        onChange={handleChange}
        className="input"
        name="lastName"
        type="text"
        maxLength={20}
        placeholder="Last name"
      />
    </>
  );
};

export default Fullname;
