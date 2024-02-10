'use client'
import React from 'react'
import { Button, Text } from '@chakra-ui/react';
import styles from "@/app/page.module.css";
import { useRouter } from 'next/navigation';

function page() {
  const router=useRouter();
  
const handleclick=()=>{
  router.push("/")
  
}
 
 


  return (
    <div>
      
      
        <div className={styles.sucessfulPage }>
         
         
        <Text fontSize='25px' color='black'mb={10} >
            Flight Successfully Booked
         </Text>
         <Text fontSize='15px' color='tomato'>
            Thank you for Visiting...
         </Text>

         <Button  onClick={handleclick}> Logout</Button>

        </div>
    </div>
  )
}

export default page;
