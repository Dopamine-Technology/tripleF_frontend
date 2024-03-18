import React from "react";
import { Form, Col } from "react-bootstrap";

const Input = ({
  register,
  errors,
  name,
  label,
  placeholder,
  className,
  type,
  inputWidth,
  defaultValue,
  disabled, // Adding disabled prop
}) => {
  return (
    <Form.Group as={Col} md={4} className="mb-4">
      <Form.Label className={`text-capitalize text-black label`}>
        {label}
      </Form.Label>
      <div className="position-relative me-3">
        <Form.Control
          size="lg"
          {...register(name)}
          className={`${className} ${
            errors && errors[name]?.message ? "border-danger" : ""
          } `}
          style={{
            backgroundColor: disabled ? "#f2f2f2" : "transparent", // Setting background color if disabled
            border: "1px solid rgba(144,144,144, 0.3)",
            color: "black",
            width: inputWidth || "15rem",
            paddingRight: "2.5rem",
          }}
          placeholder={placeholder}
          defaultValue={defaultValue}
          type={type}
          disabled={disabled} // Setting disabled attribute
        />
      </div>
      {errors && (
        <div className="text-danger text-start" style={{ width: "15rem" }}>
          {errors[name]?.message}
        </div>
      )}
    </Form.Group>
  );
};

export default Input;
