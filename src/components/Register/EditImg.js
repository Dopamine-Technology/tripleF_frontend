import React from "react";
import { Card } from "react-bootstrap";
import placeholder from '../../assets/imgs/placeholder.png'

const EditImage = ({ register, name, label, image, watch }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div >
        <Card.Img
          variant='top'
          src={
            watch(name)?.length > 0
              ? URL.createObjectURL(watch(name)[0])
              : placeholder
          }
          style={{
            width: "60px",
            height: "60px",
            borderRadius:'4px'
          }}
          className=' border-4 border me-2'
        />
        {image}
      </div>
      <div>
        <label
          htmlFor='upload-input'
          className='custom-file-upload d-inline-block mt-4 px-2  cursor-pointer bg-transparent text-primary  bg-white '
        >
          <input
            {...register(name)}
            id='upload-input'
            type='file'
            accept='image/*'
            className='d-none'
            name={name}
          />
          {label}
        </label>
        <p style={{color:'#464646'}}>.png .jpeg files up to 8MB</p>
      </div>
    </div>
  );
};

export default EditImage;
