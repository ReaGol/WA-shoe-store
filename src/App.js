import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [shoesArr, setShoesArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [inputImg, setInputImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);

  useEffect(() => {
    //? Read
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://6374aa1608104a9c5f856b46.mockapi.io/Store"
        );
        setShoesArr(data);
        setIsLoading(false);
      } catch (e) {
        setErrorMes(e.message);
        setTimeout(() => {
          setErrorMes(null);
        }, 1500);
      }
    };
    fetchData();
  }, []);

  console.log(shoesArr.photo);

  const handleAddShoe = async () => {
    if (inputVal.trim()) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://6374aa1608104a9c5f856b46.mockapi.io/Store/",
          {
            shoe: inputVal,
            img: inputImg,
            sold: false,
          }
        );
        setShoesArr((prev) => [...prev, data]);
        setInputVal("");
        setInputImg("");
        setIsLoading(false);
      } catch (e) {
        setErrorMes(e.message);
      }
    }
  };

  //? Update
  const handleUpdateShoe = async (id, notSold) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `https://6374aa1608104a9c5f856b46.mockapi.io/Store/${id}`,
        {
          sold: !notSold,
        }
      );
      setShoesArr((prev) => {
        return prev.map((shoe) => {
          if (shoe.id !== id) {
            return shoe;
          } else {
            return data;
          }
        });
      });
      setIsLoading(false);
    } catch (e) {
      setErrorMes(e.message);
      setTimeout(() => {
        setErrorMes(null);
      }, 1500);
    }
  };

  //? Delete
  const handleDeleteShoe = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://6374aa1608104a9c5f856b46.mockapi.io/Store/${id}`
      );
      console.log(data);
      setShoesArr((prevState) =>
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
    <div className='App'>
      <h1>Shoe Store</h1>
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
      <button onClick={handleAddShoe}>Add shoe</button>
      {/* //? Read */}

      {isLoading && <h1 className='spin'></h1>}
      {setShoesArr.length && (
        <div className='shoes_container'>
          {shoesArr.map(({ shoe, name, id, photo, price, sold }, mapIndex) => (
            <div className='shoe' key={id}>
              <h3
                onClick={() => {
                  handleUpdateShoe(id, sold);
                }}
              ></h3>
              <span>
                <h2>{name}</h2>
                <h2> {price}</h2>
              </span>
              <img className='img' src={photo} alt={shoe} />
              <span>
                <button
                  className='btn-delete'
                  onClick={() => {
                    handleDeleteShoe(id);
                  }}
                >
                  Delete
                </button>
                {shoe} - {sold ? "sold" : "in stock"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
