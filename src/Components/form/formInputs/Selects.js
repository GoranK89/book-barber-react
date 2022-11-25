const Selects = ({
  arr,
  onChange,
  name,
  disabledText,
  value,
  optionContent,
}) => {
  return (
    <select
      onChange={onChange}
      className="input select"
      name={name}
      defaultValue={'default'}
    >
      <option value="default" disabled>
        {disabledText}
      </option>
      {arr.map(item => (
        <option key={item?.id} value={item?.[value]}>
          {item?.[optionContent]}
        </option>
      ))}
    </select>
  );
};

export default Selects;
