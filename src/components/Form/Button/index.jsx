import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, deleteContact, id }) => {
  return (
    <>
      <button
        id={deleteContact ? id : null}
        onClick={deleteContact ? () => deleteContact(id) : null}
        type="submit"
      >
        {text}
      </button>
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string,
};

export default Button;
