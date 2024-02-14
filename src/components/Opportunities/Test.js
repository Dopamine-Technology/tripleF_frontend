import React,{useState,useEffect} from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import useAxios from '../Auth/useAxiosHook.interceptor';
import './style.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const MAX_COUNT = 3;
const Test = () => {
  const axios=useAxios();
  const [value, setValue] = React.useState([]);
  const [Langauge,setLanguage]=useState();
  const [loading,setLoading]=useState(true)
  const suffix = (
    <>
      <DownOutlined />
    </>
  );

  useEffect(() => {
    axios
      .get('app/languages')
      .then((response) => {
        setLanguage(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching countries data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

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
      }}
      onChange={setValue}
      suffixIcon={suffix}
      placeholder=""
      options={Langauge.map((item) => ({
        value: item.id,
        label: item.name,
      }))}
    />
  );
};
export default Test;