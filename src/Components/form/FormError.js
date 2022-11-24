const FormError = ({ text }) => {
  return <span className="form-err-msg">{text}</span>;
};

FormError.defaultProps = {
  text: 'Please check your input',
};

export default FormError;
