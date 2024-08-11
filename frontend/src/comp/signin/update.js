import { FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { api } from '../actions/api'; // Import the API base URL
import './sign.css';

export const Update = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(api + "/update-password", {
        email,
        newPassword
      });

      if (response.data.success) {
        alert("Password updated successfully");
        navigate('/signin'); // Redirect to sign-in page
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password");
    }
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
          <FormHelperText className="chakra-formhelpertext">We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl className="chakra-formcontrol">
          <FormLabel className="chakra-formlabel">New Password</FormLabel>
          <Input 
            type='password' 
            className="chakra-input" 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
          <FormHelperText className="chakra-formhelpertext">We'll never share your password.</FormHelperText>
        </FormControl>
        <Button type="submit" colorScheme="teal">Update Password</Button>
        <Button colorScheme="teal" onClick={() => navigate('/signin')}>Sign In</Button>
      </form>
    </div>
  );
};