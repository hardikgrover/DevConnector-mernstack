import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function TextFieldGroup({
  name,
  placeholder,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
}) {
  return (
    <div class="form-group">
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
};
TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;
