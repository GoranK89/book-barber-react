const Input = ({ name, type, value, maxLength, placeholder, onChange }) => {
  return (
    <input
      className="input"
      onChange={onChange}
      name={name}
      type={type}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
    />
  );
};

export default Input;
