import "./InputField.css";

const InputField = ({ name, label, placeholder, parentClassName }) => {
  const inputClassName = `input-field ${parentClassName}`;
  return (
    <div className={inputClassName}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} placeholder={placeholder} />
    </div>
  );
};

export default InputField;
