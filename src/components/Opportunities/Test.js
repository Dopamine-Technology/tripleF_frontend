import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './style.css';
const MAX_COUNT = 3;
const Test = () => {
  const [value, setValue] = React.useState([]);
  const suffix = (
    <>
      <DownOutlined />
    </>
  );
  return (
    <Select
      mode="multiple"
      maxCount={MAX_COUNT}
      value={value}
      optionActiveBg='rgba(0, 0, 0, 0.09)'
      style={{
        width: '83%',
        marginTop:'0.7rem',
        marginBottom:'0.7rem',
        // height:'2.6rem'
      }}
      onChange={setValue}
      suffixIcon={suffix}
      placeholder=""
      
      options={[
        {
          value: 'German',
          label: 'Deutsch  (German)',
        },
        {
          value: 'English',
          label: 'English',
        },
        {
          value: 'Spanish',
          label: 'español  (Spanish)',
        },
        {
          value: 'French',
          label: 'français  (French)',
        },
        {
          value: 'Croatian',
          label: 'hrvatski  (Croatian)',
        },
        {
          value: 'Italian',
          label: 'italiano  (Italian)',
        },
        {
          value: 'Dutch',
          label: 'Nederlands  (Dutch)',
        },
        {
          value: 'Polish',
          label: 'polski  (Polish)',
        },
   
      ]}
    />
  );
};
export default Test;