import axios from "axios";
import React, { useState } from "react";

const AddShoe = (props) => {
  const [addNewShoe, setAddNewShoe] = useState("");
  const [shoePrice, setShoePrice] = useState("");
  const [shoeImage, setShoeImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);

  const handleInput = (e) => {
    setAddNewShoe(e.target.value);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (addNewShoe.trim()) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://6374aa1608104a9c5f856b46.mockapi.io/Store/",
          {
            shoe: addNewShoe,
            photo: shoeImage,
            price: shoePrice,
            
          }
        );
        
        addNewShoe((prev) => [...prev, data]);
        setShoePrice("");
        setShoeImage("");
        setIsLoading(false);
      } catch (e) {
        setErrorMes(e.message);
      }

    }
   
  };
  return (
    <div className='add-new-shoe'>
      <h1>Add Shoe</h1>
      {isLoading && <h1 className='spin'></h1>}
      <form onSubmit={onSubmitHandle}>
        <div className='form-control'>
          <label htmlFor='shoe-name'>Enter Shoe Name</label>
          <input type='text' name='shoe' onChange={({ target: { value } }) => setAddNewShoe(value)} />

          <label htmlFor='shoe-price'>Enter Price</label>
          <input type='number' name='price' onChange={({ target: { value } }) => setShoePrice(value)} />

          <label htmlFor='image'>Upload Image</label>
          <input type='text' name='image' value={shoeImage} onChange={({ target: { value } }) => setShoeImage(value)} />
        </div>
        <div className='form-actions'>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddShoe;
