import { FormControl, FormLabel, Input, Button, FormHelperText } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios'; 
import { api } from '../actions/api'; 
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(api + "/forgot-password", { email });
      if (response.data.message) {
        alert(response.data.message);
        navigate('/signin'); // Redirect to sign-in page after successful request
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgotPassword();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <FormControl className="chakra-formcontrol">
          <FormLabel className="chakra-formlabel">Email address</FormLabel>
          <Input 
            type='email' 
            className="chakra-input" 
            onChange={(e) => setEmail(e.target.value)} 
            
          />
          
          <FormHelperText className="chakra-formhelpertext">Enter your email address to receive a password reset link.</FormHelperText>
          <Button type="submit" colorScheme="teal">Submit</Button>
        </FormControl>
      </form>
    </div>
  );
};
