"use client"
import React, { useState } from 'react';
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Box,
  VStack,
  HStack,
  Button,
  RadioGroup,
  Radio
} from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [securityKey, setSecurityKey] = useState('');
 
  const router = useRouter();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event);
  };

  const handleSecurityKeyChange = (event) => {
    setSecurityKey(event.target.value);
  };
 

  const goToLoginpage = () => {
    router.push('/login/bookid');
  };

  const handleSubmit = async () => {
    if(role === 'admin' && securityKey !="rutuja") {
      alert("invalid admin")

    }
    else{
       
    try {
      console.log({name,email,password,role});
      await axios.post("http://localhost:5000/booking/addUser", { name, email, password,role});
      alert("User registered successfully");

      if(role == "admin"){
        router.push('/adminLogin')
      }else{
      router.push("/login/bookid")
      }
    } catch (error) {
      console.error("Registration Error", error);
      alert("Registration Error");
    }
  }
  }
  return (
    <ChakraProvider>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        background='rgba(0, 0, 0, 0.5)'
        backgroundImage="https://media.istockphoto.com/id/524384758/photo/light-sky-and-clouds.jpg?s=612x612&w=0&k=20&c=IoDnbDptHMvmSoEMVPysmVUF-574Kh5BRdS2f0OxJPY="
        backgroundSize='cover'
        backgroundPosition='center'
      >
        <VStack spacing={1}>
          <strong> Sign-UP Page</strong>

          <FormControl isRequired  >
            <FormLabel>Role:</FormLabel>
            <RadioGroup onChange={handleRoleChange} value={role}>
              <HStack alignItems="start" >
                <Radio value="user">User</Radio>
                <Radio value="admin">Admin</Radio>
              </HStack>
            </RadioGroup>

          </FormControl>

          {role === 'admin' && (
            <FormControl isRequired >
              <FormLabel >Security Key:</FormLabel>
              <Input
                type="password"
                placeholder="Enter Security Key"
                value={securityKey}
                onChange={handleSecurityKeyChange}
              />
            </FormControl>
          )}

          

          <FormControl isRequired>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>


          <Button colorScheme="blue" onClick={handleSubmit}>Sign-Up</Button>
          <a onClick={goToLoginpage}>Go to Login page</a>

        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Signup;
