import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'select2'; 
import 'select2/dist/css/select2.min.css'; 
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const SelectComponent = ({ onSelectLanguages }) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectRef = useRef(null); // Ref for the select element
  const select2InstanceRef = useRef(null); // Ref for the select2 instance

  useEffect(() => {
    setTimeout(() => {
      const fetchedLanguages = [
        { id: 1, name: 'English' },
        { id: 2, name: 'Spanish' },
        { id: 3, name: 'French' }
      ];
      setLanguages(fetchedLanguages);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading) {
      const selectElement = $(selectRef.current);
      select2InstanceRef.current = selectElement.select2({
        closeOnSelect: false,
        placeholder: '',
        allowHtml: true,
        allowClear: true,
        tags: true 
      }).on('change', handleSelectChange);
    }

    // Cleanup Select2 instance when component unmounts
    return () => {
      if (select2InstanceRef.current) {
        select2InstanceRef.current.select2('destroy');
      }
    };
  }, [loading]);

  const handleSelectChange = () => {
    const selectedLanguages = $(selectRef.current).val(); 
    console.log('aya', selectedLanguages);
    onSelectLanguages(selectedLanguages || []); 
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <select ref={selectRef} className="js-select2" multiple="multiple">
      {languages.map((language) => (
        <option key={language.id} value={language.id}>
          {language.name}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
