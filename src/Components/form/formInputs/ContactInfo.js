const ContactInfo = ({ setEmail, setPhone }) => {
  return (
    <>
      <input
        onChange={e => setEmail(e.target.value)}
        className="input"
        name="email"
        type="email"
        placeholder="Email"
      />
      <span className="form-err-msg">Please enter a valid email</span>
      <input
        onChange={e => setPhone(e.target.value)}
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
