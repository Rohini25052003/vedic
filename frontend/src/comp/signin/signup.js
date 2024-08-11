import { FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios'; 
import { api } from '../actions/api'; 
import { useNavigate } from 'react-router-dom';
import './sign.css';

export const Signup = () => {
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        await axios.post(api + "/signup", { name, email, password })
        .then((res) => {
            if (res.data.message) {
                console.log(res.data.values);
                alert(res.data.message);
                nav('/signin');
            } else {
                alert(res.data.error);
            }
        })
        .catch((e) => console.log(e));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup();
        console.log("Signup form submitted");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input 
                        type='text' 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input 
                        type='email' 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input 
                        type='password' 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Re-enter Password</FormLabel>
                    <Input 
                        type='password' 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <FormHelperText>Confirm your password</FormHelperText>
                </FormControl>
                <Button type="submit" colorScheme="teal">Submit</Button> 
            </form>
        </div>
    );
};