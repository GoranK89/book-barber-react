const FormError = ({ error }) => {
  return <span className="form-err-msg">{error}</span>;
};

FormError.defaultProps = {
  text: 'Please check your input',
};

export default FormError;
