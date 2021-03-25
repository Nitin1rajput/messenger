import React from "react";

import "./formInput.css";

const FormInput = (props) => {
  const { handleChange, label, msg, ...otherProps } = props;
  return (
    <div className="group">
      <input
        className="form-input"
        {...otherProps}
        onChange={handleChange}
        value={msg}
      />
      {label ? (
        <label
          className={`${otherProps.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
