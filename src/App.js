import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header";
import AddShoe from "./pages/AddShoe";
import Homepage from "./pages/Homepage";
import Shoe from "./pages/Shoe";
import Shoes from "./pages/Shoes";


function App() {

  return (
    <>
      <Header />
      <Routes>
        {/* <Route path='/' exact>
          </Route> */}
        <Route path='/homepage' element={<Homepage></Homepage>}></Route>
        /* <Route path='/shoes' element={<Shoes />} exact></Route>
        <Route path='/shoes/:shoeId' element={<Shoe />}></Route>
        <Route path='/shoes/add' element={<AddShoe />}></Route>
      </Routes>
    </>
  );
}

export default App;
