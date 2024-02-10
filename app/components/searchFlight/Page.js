"use client"

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, ChakraProvider,Text} from '@chakra-ui/react';
import Link from 'next/link';
import styles from '@/app/page.module.css'


function Page() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  const router=useRouter();
  console.log("flights :",flights);
  const handleSearch =  async() => {
    try {
      
      setLoading(true);
      const {data}=await axios.get('http://localhost:5000/booking/getAllFlights')
      console.log(data.AllFlights);
      setFlights(data.AllFlights);
    
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
    finally{
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  const handlelogin=() => {
    router.push('/components/header/login');

  };

  return (
   <ChakraProvider>
    <div className={styles.searchFlightDiv}>
      <div  >
      <div  className={styles.searchFlightSubDiv}>
      <h6 style={{color:"red", display:'flex',justifyContent:'center'}}>Search Flight</h6>
      <br />
      
      <label>
        From:
        <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)}  className={styles.Styleinput}/>
      </label>

      <label>
        To:
        <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} className={styles.Styleinput} />
      </label>
      <br />
      <br />
      <label >
        Date:
        <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className={styles.Styleinput } />
      </label>
      <br />
      <br />
      <div className={styles.ButtonStyle}>
      <Button colorScheme='facebook'  type="button" onClick={handleSearch} disabled={loading} >Search</Button>
      </div>
      </div>
      <br/>
      <br />

      {flights.length > 0 && (
        <div>
        
       
          <ul>
          <strong style={{color:"red", display:'flex',justifyContent:'center'}}>Available Flights</strong>
          <br/>
          <br/>
          
          <table className={styles.tableStyle}>
            <thead>
              <tr>
                <th className={styles.tableHeading}>Airline</th>
                <th className={styles.tableHeading}>Flight No</th>
                <th className={styles.tableHeading}>Price</th>
                <th className={styles.tableHeading}>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight._id}>
                  <td className={styles.tableHeading} >{flight.airLine}</td>
                  <td className={styles.tableHeading}>{flight.flightNo}</td>
                  <td className={styles.tableHeading}>{flight.price}</td>
                  <td>
                    <Link
                    href={`/login/${flight._id}`}

                    >
                      <div className={styles.ButtonStyle}>
                    <Button  size='sm' colorScheme='facebook'  >Book Now</Button>
                    </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            
          </ul>
        </div>
      )}
      </div>
    </div>
    </ChakraProvider>
  
  );
}

export default Page;

