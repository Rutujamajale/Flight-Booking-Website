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
import Link from 'next/link';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';



function Signup({params}) {
  console.log(params);
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

  const handleSignUp = () => {
    router.push('/signup');

  };
  const handleLogin = async () => {
   
    console.log("Function is called");
   
    try {
      if (!email || !password) {
        toast({
          title: 'Please fill all the fields',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return; 
      }
  
      const { data } = await axios.post("http://localhost:5000/booking/loginUser", { email, password });
      
      console.log("userData", data.userData); // Log user data
      localStorage.setItem("AccessToken", JSON.stringify(data.accessToken));
      // localStorage.setItem("userData",JSON.stringify(data.userData));
      
    
      router.push(`/bookFlight/${params.bookid}`);
    
      
  
      toast({
        title: 'Login Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    
  
      // Redirect to another page after successful login
      // router.push(`/bookFlight/${params.bookid}`);
    } catch (error) {
      console.log('Error occurred at login user: ', error);
      toast({
        title: 'Error Occurred!',
        description: error.response ? error.response.data.message : 'An error occurred during login',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };
  
  

  

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
          <strong>User Login Page</strong>

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
          {/* <Link href={`/bookFlight/${params.bookid}`}> */}

          <Button colorScheme="blue"  onClick={handleLogin}>Login</Button>
          {/* </Link> */}

          <div>
            <small>Already a User?</small>
            <span style={{ color: 'blue' , cursor:"pointer"}} onClick={handleSignUp}>Sign-Up</span>
          </div>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default Signup;