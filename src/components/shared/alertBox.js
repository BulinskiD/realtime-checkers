import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

const AlertBox = ({ message }) => {
  return message ? (
    <Alert className="text-center" variant="danger">
      {message}
    </Alert>
  ) : (
    ""
  );
};

AlertBox.propTypes = {
  message: PropTypes.string
};

export default AlertBox;
