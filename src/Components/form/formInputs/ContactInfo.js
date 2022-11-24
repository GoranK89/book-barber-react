const ContactInfo = ({ handleChange }) => {
  return (
    <>
      <input
        onChange={handleChange}
        className="input"
        name="email"
        type="email"
        placeholder="Email"
      />
      <span className="form-err-msg">Please enter a valid email</span>
      <input
        onChange={handleChange}
        className="input"
        name="phone"
        type="phone"
        placeholder="Contact number"
      />
      <span className="form-err-msg">Please enter phone number</span>
    </>
  );
};

export default ContactInfo;
