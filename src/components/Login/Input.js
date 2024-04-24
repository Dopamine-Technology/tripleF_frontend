import React, { useState ,useLayoutEffect} from "react";
import { Form, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

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
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form.Group as={Col} md={4} className={isSmallScreen?'':'mb-4'}>
      <Form.Label className={`text-capitalize text-black`}>{label}</Form.Label>
      <div className="position-relative me-3">
        <Form.Control
          size="lg"
          {...register(name, validation)}
          className={`${className} ${
            errors && errors[name]?.message ? "border-danger" : ""
          }`}
          className='input-login'
       
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
        <div className="text-danger text-start d-inline-block" style={{ whiteSpace: 'nowrap' }}>{errors[name]?.message}</div>
      )}
    </Form.Group>
  );
};

export default Input;