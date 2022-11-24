const ContactInfo = ({ handleChange }) => {
  return (
    <>
      <input
        onChange={handleChange}
        className="input"
        name="email"
        type="email"
        maxLength={40}
        placeholder="Email"
      />
      <input
        onChange={handleChange}
        className="input"
        name="phone"
        type="phone"
        placeholder="Contact number"
      />
    </>
  );
};

export default ContactInfo;
