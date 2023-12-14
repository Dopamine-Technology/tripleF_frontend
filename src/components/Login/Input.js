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
      <Form.Label className={`text-capitalize text-black`}>{label}</Form.Label>
      {isTextarea ? (
        <Form.Control
          as="textarea"
          size="lg"
          rows={rows || 3}
          cols={23}
          {...register(name, validation)}
          className={`${className} ${
            errors && errors[name]?.message ? "border-danger" : ""
          }`}
          style={{
            backgroundColor: "transparent",
            border: "1px solid black",
            color: "black",
            width: "100%", // Adjust the width here
          }}
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
            backgroundColor: "transparent",
            border: "1px solid black",
            color: "black",
            width: "30rem", 
          }}
          placeholder={placeholder}
          type={type}
        />
      )}

      {errors && (
        <div className="text-danger text-start">{errors[name]?.message}</div>
      )}
    </Form.Group>
  );
};

export default Input;
