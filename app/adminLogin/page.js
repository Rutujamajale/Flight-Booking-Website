"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Box,
  VStack,
  Button,
  
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';




function Admin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router=useRouter();
  const toast = useToast();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

 
const handleLogin=()=>{
  if(email==="admin@gmail.com"&&password==="Admin@123"){
    router.push('/adminOperations')
  }
  else{
    alert('Invalid Admin email or password')
  }

}
  
      

  return (
    <ChakraProvider>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        background= 'rgba(0, 0, 0, 0.5)'
          backgroundImage={"https://media.istockphoto.com/id/524384758/photo/light-sky-and-clouds.jpg?s=612x612&w=0&k=20&c=IoDnbDptHMvmSoEMVPysmVUF-574Kh5BRdS2f0OxJPY="}
        backgroundSize= 'cover'
        backgroundPosition= 'center'
        
      >
        <div >
       
        </div>
        <VStack spacing={5}>
          <strong>Admin Login Page</strong>

          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              isRequired
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              isRequired
            />
          </FormControl>
         

          <Button colorScheme="blue"  onClick={handleLogin}>Login</Button>
        

          <div>
            
           
          </div>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default Admin;