import React from "react";
import { Card } from "react-bootstrap";

const EditImage = ({ register, name, label, image, watch }) => {
  return (
    <div>
      <Card.Img
        variant='top'
        src={
          watch(name)?.length > 0
            ? URL.createObjectURL(watch(name)[0])
            : "https://via.placeholder.com/100x100"
        }
        style={{
          width: "100px",
          height: "100px",
        }}
        className='rounded-circle border-3 border me-4'
      />
      <label
        htmlFor='upload-input'
        className='custom-file-upload d-inline-block mt-4 px-2 py-2 cursor-pointer bg-transparent text-primary  bg-white '
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
      <p>.png .jpeg files up to 8MB</p>
    </div>
  );
};

export default EditImage;