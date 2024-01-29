import React from "react";
import { Form, Col } from "react-bootstrap";
import './style.css'

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
  radioOptions,
  selectOptions, 
  onChange,
  borderRadius
}) => {
  return (
    <Form.Group as={Col} md={4} className="mb-4">
      <Form.Label className={`text-capitalize text-black label2`}>
        {label}
      </Form.Label>
      <div className="position-relative me-2">
        {type === 'text' || type === 'number' ? (
          <Form.Control
            size="lg"
            {...register(name)}
            className={`${className}  ${
              errors && errors[name]?.message ? "border-danger" : ""
            } `}
            style={{
              backgroundColor: "white",
              border: "1px solid rgba(144,144,144, 0.3)",
              color: "black",
              width: inputWidth || "15rem",
      
            }}
            placeholder={placeholder}
            type={type}
          />
        ) : type === 'radio' ? (
          <div className="radio-buttons d-flex" style={{width:'20rem'}}>
            {radioOptions &&
              radioOptions.map((option) => (
                <label
                  key={option.value}
                  className="custom-radio-btn3 bg-white"
                 
                >
                  <span className="label2">{option.label}</span>
                  <input
                    type="radio"
                    id={option.value}
                    value={option.value}
                    {...register(name)}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
          </div>
        ) : type === 'select' ? (
          <Form.Control
            as="select"
            size="lg"
            {...register(name)}
            className={`${className}  ${
              errors && errors[name]?.message ? "border-danger" : ""
            } `}
            style={{
              backgroundColor: "white",
              border: "1px solid rgba(144,144,144, 0.3)",
              color: "black",
              width: inputWidth || "15rem",
              borderRadius:borderRadius|| "10px",
            }}
            onChange={onChange}
          >
                        <option vlaue="">{placeholder}</option>
            {selectOptions &&
              selectOptions.map((option) => (
                <option key={option.id} value={option.id} >
                  {option.name}
                  
                </option>
              ))}
          </Form.Control>
        ) : null}
      </div>
      {errors && (
        <div className="text-danger text-start">{errors[name]?.message}</div>
      )}
    </Form.Group>
  );
};

export default Input;
