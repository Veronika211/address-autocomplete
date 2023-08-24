import "./Button.css";

const Button = ({ label, disabled, onClick, type, parentClassName }) => {
  const buttonClassName = `${parentClassName} button ${
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
