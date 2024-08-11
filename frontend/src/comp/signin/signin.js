import { FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios'; 
import { api } from '../actions/api'; 
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
    const nav = useNavigate();
    const [Email, setEmail] = useState(''); 
    const [password, setPass] = useState(''); 

    const handleSignin = async () => {
        await axios.post(api + "/signin", { Email, password })
        .then((res) => {
            if (res.data.message) {
              sessionStorage.auth=JSON.stringify(res?.data?.values);
                console.log(res?.data?.values);
                alert(res.data.message);
                nav('/signup')
            } else {
                alert(res.data.error);
                nav('/signin');
            }
        })
        .catch((e) => console.log(e));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignin();
        console.log("Form submitted");
    };

    const handleForgotPassword = () => {
        nav('/update');  
    };
    const newUser = () => {
        nav('/signup');  
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
                    <FormHelperText className="chakra-formhelpertext"></FormHelperText>
                </FormControl>
                <FormControl className="chakra-formcontrol">
                    <FormLabel className="chakra-formlabel">Password</FormLabel>
                    <Input 
                        type='password' 
                        className="chakra-input" 
                        onChange={(e) => setPass(e.target.value)} 
                    />
                    <FormHelperText className="chakra-formhelpertext"></FormHelperText>
                    <Button type="submit" colorScheme="teal">Submit</Button>
                    <Button colorScheme="teal" onClick={handleForgotPassword}>Forgot Password</Button>
                    <Button colorScheme="teal" onClick={newUser}>NewUser</Button>

                </FormControl>
            </form>
        </div>
    );
};