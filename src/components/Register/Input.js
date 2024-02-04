import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { message } from "antd";

// ... other imports

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
  const [showPassword, setShowPassword] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    const emojiPattern = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

    // Check if the input contains any unwanted characters
    if (!emojiPattern.test(value)) {
      setInputValue(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form.Group as={Col} md={4} className="mb-4">
      <Form.Label className={`text-capitalize text-black label`}>
        {label}
      </Form.Label>
      <div className="position-relative me-3">
        <Form.Control
          size="lg"
          {...register(name)}
          onChange={handleInputChange}
          className={`${className}  ${
            errors && errors[name]?.message ? "border-danger" : ""
          } `}
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(144,144,144, 0.3)",
            color: "black",
            width: inputWidth || "15rem",
            paddingRight: "2.5rem",
          }}
          placeholder={placeholder}
          value={inputValue}
          type={showPassword ? "text" : type}
        />
        {type === "password" && (
          <div
            className="position-absolute top-50 end-0 translate-middle-y"
            style={{ marginRight: "-15rem" }}
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
