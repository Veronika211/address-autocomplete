import "./InputField.css";

const InputField = ({
  name,
  label,
  placeholder,
  parentClassName,
  value,
  onChange,
  onBlur,
}) => {
  const inputClassName = `input-field ${parentClassName}`;
  return (
    <div className={inputClassName}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
