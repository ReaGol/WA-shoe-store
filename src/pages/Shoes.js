import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Shoes() {
  const [shoesArr, setShoesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);

   useEffect(() => {
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

   

  return (
    <div>
      <h1>Shoe Store</h1>

      {errorMes && <h2>{errorMes}</h2>}
      {isLoading && <h1 className='spin'></h1>}
      {setShoesArr.length && (
        <div className='shoes_container'>
          {shoesArr.map(({ shoe, name, id, photo, price, sold }, mapIndex) => (
            <Link to={`/shoes/${id}`}>
              <div className='shoe' key={id}>
                <h3></h3>
                <span>
                  <h2>{name}</h2>
                  <h2> {price}</h2>
                </span>
                <img className='img' src={photo} alt={shoe} />
                <span>
                  {shoe} - {sold ? "sold" : "in stock"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shoes
