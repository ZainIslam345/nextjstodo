import React from "react";
import styles from "./styles.module.css";
import { Field, ErrorMessage } from "formik";

const TextInput = ({
  id,
  label,
  name,
  touched,
  containerClass = "",
  error,
  classChange = false,
  type = "text",
  ...rest
}) => {
  return (
    <div
      className={`${
        classChange ? "" : ` ${styles.textInput}`
      } ${containerClass} `}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <Field
        name={name}
        type={type}
        id={id}
        className={error && touched[id] ? `${styles.textInput_error}` : null}
        {...rest}
      />
      <ErrorMessage name={name} component="span" />
    </div>
  );
};

export default TextInput;
