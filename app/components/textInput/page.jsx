import React, { forwardRef } from "react";
import styles from './styles.module.css';
import { Field, ErrorMessage } from "formik";

const TextInput = forwardRef(
  (
    {
      id,
      label,
      name,
      touched,
      containerClass = "",
      error,
      classChange = false,
      type = "text",
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`${classChange ? '' :    ` ${styles.textInput}` } ${containerClass} `}>
        {label && <label htmlFor={id}>{label}</label>}
        <Field 
          name={name}
          ref={ref}
          type={type}
          id={id}
          className={error && touched[id] ? `${styles.textInput_error}` : null}
          {...rest}
        />
        <ErrorMessage name={name} component="span" className={styles.erro}/>
      </div>
    );
  }
);

TextInput.displayName = 'text Input';

export default TextInput;
