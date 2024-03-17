import React from "react";
import { Form, Col } from "react-bootstrap";

const Input = ({
  register,
  errors,
  name,
  label,
  placeholder,
  className,
  validation,
  type,
  options,
  isDarkMode,
  rows,
}) => {
  const isTextarea = type === "textarea";

  return (
    <Form.Group as={Col} md={4} className="mb-4">
      <Form.Label className={`text-capitalize text-white`}>{label}</Form.Label>
      {isTextarea ? (
        <Form.Control
          as="textarea"
          size="lg"
          rows={rows || 4}
          cols={20}
          {...register(name, validation)}
          className={`${className} ${
            errors && errors[name]?.message ? "border-danger" : ""
          }`}
          className='textarea-input'
          placeholder={placeholder}
        />
      ) : (
        <Form.Control
          size="lg"
          {...register(name, validation)}
          className={`${className} ${
            errors && errors[name]?.message ? "border-danger" : ""
          }`}
          style={{

            
          }}
          className='text-input'
          placeholder={placeholder}
          type={type}
        />
      )}

{errors && (
        <div className="text-danger text-start" style={{width:'19rem'}}>{errors[name]?.message}</div>
)}
    </Form.Group>
  );
};

export default Input;
