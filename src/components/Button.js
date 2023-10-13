import React from "react";

function Button({ buttonClass, text, onClick }) {
  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
