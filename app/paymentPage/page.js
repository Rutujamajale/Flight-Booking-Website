"use client"
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { ChakraProvider, Text, Input, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';



function Page() {
  const toast = useToast();

  // State to keep track of form values
  const [formData, setFormData] = useState({
    cardNumber: '',
    address: '',
   
    country: '',
    city: '',
    state: '',
    zipCode: ''
  });


  const router=useRouter();

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
   
    if (name === 'cardNumber' || name === 'zipCode') {
     
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
  
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = () => {
    // Check if any field is empty
    for (const field in formData) {
      if (!formData[field]) {
        toast({
          title: 'Please fill all the fields',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return; // Exit early if any field is empty
      }
    }

    // Proceed with form submission
    console.log('Form submitted successfully');
    router.push('/successfulPage')

  

  };

  return (
    <ChakraProvider>
      <div className={styles.background}>
        <div className={styles.paymentPage}>
          <Text fontSize='20px' color='tomato' mr={4} mb={4}>
             Payment Details
          </Text>
          <Input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} htmlSize={15} width='auto' placeholder='Card Number' mb={4} />
          <Input name="address" value={formData.address} onChange={handleInputChange} htmlSize={15} width='auto' placeholder='Address' mb={4} />
          <Input name="aptNumber" value={formData.aptNumber} onChange={handleInputChange} htmlSize={15} width='auto' placeholder='Apt,unit (optional)' mb={4} />
          <Input name="country" value={formData.country} onChange={handleInputChange} htmlSize={15} width='auto' placeholder='Country' mb={4} />
          <div className={styles.paymentDiv}>
            <Input name="city" value={formData.city} onChange={handleInputChange} htmlSize={4} width='auto' placeholder='City' mr={4} />
            <Input name="state" value={formData.state} onChange={handleInputChange} htmlSize={2} width='auto' placeholder='State' mr={4} />
            <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} htmlSize={2} width='auto' placeholder='Zip code' mb={4} mr={4} />
          </div>
          <Button colorScheme='facebook' onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default Page;
