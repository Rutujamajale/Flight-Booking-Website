"use client"
import React from 'react';
import styles from '@/app/page.module.css';
import { useRouter } from "next/navigation";
import { Button, ChakraProvider } from '@chakra-ui/react';

function HeaderPage() {
 const router=useRouter();

 const handleLogin=()=>{
  router.push('/login/bookid')
 }
 const handleSignup=()=>{
  router.push("/signup")
 }
 const handleAdminLogin=()=>{
  router.push("/adminLogin")
 }

  return (
    <ChakraProvider>
    <div className={styles.headerMainDiv}>
      <div >
        <div className={styles.headertext}>
          <strong>Flight Booking system</strong>
        </div>

        <div className={styles.button}>
          <Button colorScheme='facebook'  size="sm" onClick={handleSignup} className={styles.headerButton}> SignUp</Button>
          <Button colorScheme='facebook'  size="sm" onClick={handleLogin} className={styles.headerButton} >Login</Button>
          <Button colorScheme='facebook'  size="sm" onClick={handleAdminLogin} className={styles.headerButton} >Admin</Button>
        </div>
      </div>
    </div>
    </ChakraProvider>
  );
}

export default HeaderPage;
