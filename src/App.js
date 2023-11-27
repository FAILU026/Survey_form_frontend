import React, { useState,useEffect } from 'react'
import "./App.css";
import axios from 'axios';
import {  Routes, Route} from "react-router-dom";
import Data from './Components/Data';
import Nav from './Components/Nav';
import Form from './Components/Form';
import Home from './Components/Home';


const App = () => {

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    phoneNumber: '',
    address: '',
    message: '',
  });

  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const data = await  axios.post('https://survey-form-backend.vercel.app/create',formData)
    console.log(data)
    if(data.data.success){
      alert("data Save successfully")}
      setFormData({
        name: '',
        gender: '',
        nationality: '',
        email: '',
        phoneNumber: '',
        address: '',
        message: '',
      })
  }

  const [dataList,setDataList]= useState([])

   
    axios.get('https://survey-form-backend.vercel.app/read')
          .then(response => setDataList(response.data))
          .catch(error => console.error('Error fetching surveys:', error));
  
      
  useEffect(() => {
    axios.get('https://survey-form-backend.vercel.app/read')
          .then(response => setDataList(response.data))
          .catch(error => console.error('Error fetching surveys:', error));
        },[]);

  return (
    <>
    
    <Nav />
    <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/form' element={<Form
            handleSubmit={handleSubmit} 
            formData={formData}
            setFormData={setFormData}
        />} />
        <Route path='/data' element={< Data 
            dataList={dataList}
        
        />} />
  </Routes>



    </>
  )
}

export default App
