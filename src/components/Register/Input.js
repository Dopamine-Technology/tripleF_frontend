import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  register,
  errors,
  name,
  label,
  placeholder,
  className,
  validation,
  type,
  rows,
  inputWidth, 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form.Group as={Col} md={4} className="mb-4">
      <Form.Label className={`text-capitalize text-black`}>{label}</Form.Label>
      <div className="position-relative me-3">
        <Form.Control
          size="lg"
          {...register(name, validation)}
          className={`${className} ${
            errors && errors[name]?.message ? "border-danger" : ""
          }`}
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(144,144,144, 0.3)",
            color: "black",
            width: inputWidth || "15rem", // Use provided width or default to 15rem
            paddingRight: "2.5rem", // Space for the toggle icon
          }}
          placeholder={placeholder}
          type={showPassword ? "text" : type}
        />
        {type === "password" && (
          <div
            className="position-absolute top-50 end-0 translate-middle-y"
            // style={{marginRight:'-15rem'}}
            style={{marginRight:'-19rem'}}
          >
            {showPassword ? (
              <FaEyeSlash
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaEye
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        )}
      </div>
      {errors && (
        <div className="text-danger text-start">{errors[name]?.message}</div>
      )}
    </Form.Group>
  );
};

export default Input;
