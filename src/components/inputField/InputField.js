import "./InputField.css";

const InputField = ({
  name,
  label,
  placeholder,
  parentClassName,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const inputClassName = `input-field ${parentClassName}`;
  return (
    <div className={inputClassName}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputField;
