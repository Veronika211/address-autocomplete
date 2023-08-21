import "./Button.css";

const Button = ({ label, disabled, handleClick, type, parentClassName }) => {
  const buttonClassName = `${parentClassName} button ${
    disabled ? "disabled" : ""
  }`;

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      type={type}
      className={buttonClassName}
    >
      {label}
    </button>
  );
};

export default Button;
