import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function InputGroup({
  name,
  placeholder,
  error,
  value,
  icon,
  type,

  onChange,
}) {
  return (
    <div class="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>

      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
InputGroup.defaultProps = {
  type: "text",
};
export default InputGroup;
