import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'select2'; 
import 'select2/dist/css/select2.min.css'; 
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const SelectComponent = ({ onSelectLanguages }) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

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
      $('.js-select2').select2({
        closeOnSelect: false,
        placeholder: '',
        allowHtml: true,
        allowClear: true,
        tags: true 
      });

      // Attach onChange event listener to the select element
      $('.js-select2').on('change', handleSelectChange);
    }
  }, [loading]); // Depend on loading state only

  const handleSelectChange = () => {
    const selectedLanguages = $('.js-select2').val(); // Get selected values directly from Select2
    console.log('aya', selectedLanguages);
    onSelectLanguages(selectedLanguages || []); // Ensure selectedLanguages is an array
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <select className="js-select2" multiple="multiple">
      {languages.map((language) => (
        <option key={language.id} value={language.id}>
          {language.name}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
