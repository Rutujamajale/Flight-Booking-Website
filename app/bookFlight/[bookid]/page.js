"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/navigation';
import styles from '@/app/page.module.css'
import { Button, ChakraProvider } from '@chakra-ui/react';

function Page({ params }) {
  console.log(" on Flight details: ",params);
  const [userData, setUserData] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const router=useRouter();

  useEffect(()=>{
    const accessToken = JSON.parse(localStorage.getItem("AccessToken"));
    setAccessToken(accessToken);
  },[])

  useEffect(()=>{
  },[])

  
  //   const fetchUserData = async () => {
  //     try {
        
  //       // console.log("accessToken at get user :",accessToken);
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${accessToken}`
  //         }
  //       };

  //       const userDataResponse = await axios.get(`http://localhost:5000/booking/loginUser`, config);
  //       console.log("userDataResponse :",userDataResponse);
  //        setUserData(userDataResponse.data.user);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       setError('Error fetching user data. Please try again later.');
  //     }
  //   };
   

    
  //   useEffect(() => {
  //     if(accessToken && accessToken!==undefined && accessToken !==null)
  //   fetchUserData();
    
  // }, [ accessToken]);

  const fetchFlightData = async () => {
    try {
      const accessToken = localStorage.getItem("AccessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      };
console.log("params.bookid : " ,params.bookid);
      const {data} = await axios.get(`http://localhost:5000/booking/getFlightById/${params.bookid}`,config);
      console.log("flightDataResponse",data);
      setFlightData(data.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Error fetching flight data. Please try again later.');
    }
  };
  useEffect(()=>{
    if(params && params!==undefined && params!==null)
    fetchFlightData();
  },[params])

  const handlesubmit=()=>{
    const confirm=window.confirm("are you sure you want to submit?");
    if(confirm){
      router.push("/paymentPage")
    }
  }
  return (
    <ChakraProvider>
    <div className={styles.BookFlight}>
      <div className={styles.userDetails}>
      <h3 style={{color:"red"}}>User Details</h3>
      {/* {userData && ( */}
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid black', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid black' }}>User Name</th>
            <th style={{ padding: '8px', border: '1px solid black' }}>User Email</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px', border: '1px solid black' }}>Rutuja Majale</td>
            <td style={{ padding: '8px', border: '1px solid black' }}>rutuja@gmail.com</td>
           
          </tr>
        </tbody>
      </table>
      {/* )} */}
</div>

<div className={styles.userDetails}>
      <h3 style={{color:"red"}}>Flight Details</h3>
      {flightData && (
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid black', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', border: '1px solid black' }}>Airline</th>
              <th style={{ padding: '8px', border: '1px solid black' }}>Flight No</th>
              <th style={{ padding: '8px', border: '1px solid black' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid black' }}>{flightData.airLine}</td>
              <td style={{ padding: '8px', border: '1px solid black' }}>{flightData.flightNo}</td>
              <td style={{ padding: '8px', border: '1px solid black' }}>{flightData.price}</td>
            </tr>
          </tbody>
        </table>
      )}
      </div>

      {error && <div>{error}</div>}

      <Button className={styles.bookFlightButton} colorScheme="facebook" onClick={handlesubmit}>Submit</Button>
    </div>
    </ChakraProvider>
  );
}

export default Page;



