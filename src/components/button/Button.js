import "./Button.css";

const Button = ({
  label,
  disabled,
  onClick,
  variant,
  type,
  parentClassName,
}) => {
  const buttonClassName = `${parentClassName} button ${variant} ${
    disabled ? "disabled" : ""
  }`;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={buttonClassName}
    >
      {label}
    </button>
  );
};

export default Button;
