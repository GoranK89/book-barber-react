const Fullname = ({ setFirstName, setLastName }) => {
  return (
    <>
      <input
        onChange={e => setFirstName(e.target.value)}
        className="input"
        name="firstName"
        type="text"
        placeholder="First name"
      />
      <input
        onChange={e => setLastName(e.target.value)}
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
