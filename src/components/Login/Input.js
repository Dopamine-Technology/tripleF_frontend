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
  options,
  isDarkMode,
  rows,
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
            border: "1px solid #EBEBEB",
            color: "black",
            width: "30rem", 
          }}
          placeholder={placeholder}
          type={showPassword ? "text" : type}
        />
          {type === "password" && (
          <div
            className="position-absolute top-50 end-0 translate-middle-y eye-icon"
       
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