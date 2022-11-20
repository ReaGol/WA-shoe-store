import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import axios from "axios";

function Shoe(props) {
  const params = useParams()
  const [shoeData, setShoeData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [inputImg, setInputImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);

  useEffect(() => {
    console.log(params)
    const fetchShoeData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://6374aa1608104a9c5f856b46.mockapi.io/Store/${params.shoeId}`
        );
        setShoeData(data);
      } catch (e) {
        setErrorMes(e.message);
        setTimeout(() => {
          setErrorMes(null);
        }, 5000);
        // goto error page
      }
      finally {
        setIsLoading(false)
      }
    };
    fetchShoeData();
  }, [params]);

  const handleUpdateShoe = async (sold, name, photo) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `https://6374aa1608104a9c5f856b46.mockapi.io/Store/${params.shoeId
      }`,
        {
          name,
          photo,
          sold,
        }
      );
      setShoeData(data);
     
    } catch (e) {
      setErrorMes(e.message);
      setTimeout(() => {
        setErrorMes(null);
      }, 5000);
    }
    finally{
      setIsLoading(false)
    }
  };

  const handleDeleteShoe = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://6374aa1608104a9c5f856b46.mockapi.io/Store/${params.shoeId}`
      );
      console.log(data);
      setShoeData((prevState) =>
        prevState.filter((shoe) => {
          return shoe.id !== data.id;
        })
      );
    } catch (e) {
      setErrorMes(e.message);
      setTimeout(() => {
        setErrorMes(null);
      }, 1500);
    }
  };

  return (
    <div className='wrapper'>
      <Card />
      <div className='App'>
        {errorMes && <h2>{errorMes}</h2>}
        <input
          value={inputVal}
          placeholder='shoe'
          onChange={({ target: { value } }) => setInputVal(value)}
        />
        <input
          value={inputImg}
          placeholder='photo'
          onChange={({ target: { value } }) => setInputImg(value)}
        />
        {isLoading && <h1 className='spin'>Loading</h1>}
        
          <div className='shoes_container'>
            <div className='shoe' key={shoeData.id}>
              <h3
                onClick={() => {
                  handleUpdateShoe(!shoeData.sold, inputVal, inputImg);
                }}
              >Edit</h3>
              <span>
                <h2>{shoeData.name}</h2>
                <h2> {shoeData.price}</h2>
              </span>
              <img className='img' src={shoeData.photo} alt={shoeData.name} />
              <span>
                <button
                  className='btn-delete'
                  onClick={() => {
                    handleDeleteShoe(shoeData.id);
                  }}
                >
                  Delete
                </button>
                {shoeData.name} - {shoeData.sold ? "sold" : "in stock"}
              </span>
            </div>
          </div>
      </div>
      );
    </div>
  );
}

export default Shoe;