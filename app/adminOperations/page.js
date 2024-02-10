// 'use client'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function BookingList() {
//   const [bookings, setBookings] = useState(null);
//   const [editingBooking, setEditingBooking] = useState(null);
//   const [editedUser, setEditedUser] = useState(" ");
//   const [editedFlight, setEditedFlight] = useState(" ");
  

//   const fetchBookingData=async()=>{
   
//     const {data}=await axios.get('http://localhost:5000/booking/getBookings');
//     console.log(data);
    
//     Promise.all(data.AllBooking.map(async(booking) => {
         
//           const userPromise =await axios.get(`http://localhost:5000/booking/loginUserbyId/${booking.user}`);
          
//           const flightPromise =await axios.get(`http://localhost:5000/booking/getFlightById/${booking.flight}`);
          
          
//           return Promise.all([userPromise, flightPromise])
//             .then(([userData, flightData]) => {
             
//               const updatedBooking = {
//                 ...booking,
//                 user: userData.data.user, 
//                 flight: flightData.data 
//               };
//             //   return updatedBooking;
//             console.log("updatedBooking", updatedBooking);
//               setBookings(updatedBooking)
//             });
//       }))
       
//   }

//   useEffect(() => {
//     fetchBookingData();
//   }, []);

  
//   const handleEdit = (booking) => {
//     setEditingBooking(booking);
//     setEditedUser(booking.user);
//     setEditedFlight(booking.flight);
//   };
//   const saveEditedBooking = async () => {
//     try {
//       const updatedBooking = { ...editingBooking, user: editedUser, flight: editedFlight };
//       await axios.put(`http://localhost:5000/booking/updateUser${updatedBooking._id}`, updatedBooking);
//       fetchBookingData();
//       setEditingBooking(null);
//     } catch (error) {
//       console.error('Error updating booking:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/booking/DeleteUser${id}`);
//       fetchBookingData();
//     } catch (error) {
//       console.error('Error deleting booking:', error);
//     }
//   };


//   return (
//     <div>
//       <div>
//       <h1>Booking Information</h1>
//       {bookings && (
//         <div>
//           <div key={bookings._id}>
//             {editingBooking === bookings ? (
//               <div>
//                 <input
//                   type="text"
//                   value={editedUser}
//                   onChange={(e) => setEditedUser(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   value={editedFlight}
//                   onChange={(e) => setEditedFlight(e.target.value)}
//                 />
//                 <button onClick={() => saveEditedBooking()}>Save</button>
//                 <button onClick={() => setEditingBooking(null)}>Cancel</button>
//               </div>
//             ) : (
//               <div>
//                 <h2>User Data:</h2>
//                 <p>Name: {bookings.user.name}</p>
//                 <p>Email: {bookings.user.email}</p>
//                 <h2>Flight Data:</h2>
//                 <p>Flight Name: {bookings.flight.data.airLine}</p>
//                 <p>Flight Price: {bookings.flight.data.price}</p>
//                 <p>Flight No: {bookings.flight.data.flightNo}</p>
//                 <button onClick={() => handleEdit(bookings)}>Edit</button>
//                 <button onClick={() => handleDelete(bookings._id)}>Delete</button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// }

// export default BookingList;
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const initialData = [
    { id: 1, name: 'Max', email: 'max@gmail.com', flightName: 'airLine', flightNo: '123' },
    { id: 2, name: 'Jack', email: 'jack@gmail.com', flightName: 'Indigo', flightNo: '467' },
    { id: 3, name: 'Rutuja', email: 'rutuja@gmail.com', flightName: 'airLine', flightNo: '123' }
  ];

  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const router = useRouter();

  const handleEdit = (id, item) => {
    setEditingId(id);
    setEditedData(item);
  };

  const handleSave = () => {
    const updatedData = data.map(item => (item.id === editingId ? editedData : item));
    setData(updatedData);
    setEditingId(null);
    setEditedData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  const handleClick=()=>{
    router.push('/adminLogin');
    
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name:</th>
            <th>Email:</th>
            <th>Flight Name:</th>
            <th>Flight No:</th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{editingId === item.id ? <input type="text" name="name" value={editedData.name || item.name} onChange={handleInputChange} /> : item.name}</td>
              <td>{editingId === item.id ? <input type="text" name="email" value={editedData.email || item.email} onChange={handleInputChange} /> : item.email}</td>
              <td>{editingId === item.id ? <input type="text" name="flightName" value={editedData.flightName || item.flightName} onChange={handleInputChange} /> : item.flightName}</td>
              <td>{editingId === item.id ? <input type="text" name="flightNo" value={editedData.flightNo || item.flightNo} onChange={handleInputChange} /> : item.flightNo}</td>
              <td>
                {editingId === item.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item.id, item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleClick}>Log Out</button>
    </div>
  );
}

export default Page;
