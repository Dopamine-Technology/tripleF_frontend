import React,{useState} from "react";
import { Form, Col } from "react-bootstrap";
import { useLanguage } from "../LanguageContext/LanguageProvider";

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

  const [isHovering, setIsHovering] = useState(false);
  const { language, changeLanguage } = useLanguage(); 
  const handleHover = () => {
    setIsHovering(true);
  };

  const handleHoverOut = () => {
    setIsHovering(false);
  };

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
          onMouseOver={handleHover} onMouseOut={handleHoverOut}
          placeholder={placeholder}
          style={{
            backgroundColor:isHovering ? '#1A2A44':'#1A2A44',
            color:isHovering?'white':'white'
            }}
        />
      ) : (
        <Form.Control
          size="lg"
          {...register(name, validation)}
          className={`${className} ${
            errors && errors[name]?.message ? "border-danger" : ""
          }`}
          style={{
          backgroundColor:isHovering ? '#1A2A44':'#1A2A44',
          color:isHovering?'white':'white'
            
          }}
          className='text-input'
          style={{width:language=='ar'?'12rem':'`'}}
          placeholder={placeholder}
          type={type}
          onMouseOver={handleHover} onMouseOut={handleHoverOut}
        />
      )}

{errors && (
        <div className="text-danger text-start" style={{width:'19rem'}}>{errors[name]?.message}</div>
)}
    </Form.Group>
  );
};

export default Input;
