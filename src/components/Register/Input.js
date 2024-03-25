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
  defaultValue,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState('');
  const [inputValue, setInputValue] = useState(defaultValue || ''); 
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const emojiPattern = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

    if (!emojiPattern.test(value)) {
      setInputValue(value);
      setIsTyping(true);
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
            backgroundColor: disabled ? "#f2f2f2" : "transparent", 
            border: "1px solid rgba(144,144,144, 0.3)",
            color: "black",
            width: inputWidth || "15rem",
            paddingRight: "2.5rem",
            outline: "none",
          }}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={inputValue}
          type={showPassword ? "text" : type}
          disabled={disabled} 
        />
        {type === "password" && (
          <div
            className="position-absolute top-50 end-0 translate-middle-y"
            style={{ marginRight: "-14rem" }}
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
        <div className="text-danger text-start d-inline-block" style={{ whiteSpace: 'nowrap' }}>{errors[name]?.message}</div>
      )}
    </Form.Group>
  );
};

export default Input;