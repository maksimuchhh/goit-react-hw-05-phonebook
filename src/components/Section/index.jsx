import React from "react";
import PropTypes from "prop-types";

const Section = ({ children, title }) => {
  return (
    <>
      {title && <h2>{title}</h2>}
      <section>{children}</section>
    </>
  );
};

Section.propTypes = {
  title: PropTypes.string,
};

export default Section;
