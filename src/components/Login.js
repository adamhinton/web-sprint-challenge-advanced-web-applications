import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';


//Lambda already made some styled components for us as seen below, very helpful

const Login = () => {
    const {push} = useHistory();

    const [cred, setCred] = useState({
        username: '',
        password: '',
    })
    //this is the user and pass as the client is typing it in.

    const [error, setError] = useState("")

    const handleChange = e =>{
        setCred({
            ...cred,
            [e.target.name]:e.target.value,
          });
          //this live-updates the user and pass state as the user types in the relevant fields.
    }


    const handleSubmit = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', {username: cred.username, password: cred.password})
            .then(res =>{
                localStorage.setItem('token', res.data.token);
                push('/view')
            })
            .catch(err =>{
                setError("You did it wrong, you're banned now")
                //This will only appear below if they've typed in the wrong user/pass.
            })
    }


    return(<ComponentContainer>
        <ModalContainer>
            <h1>Welcome to Blogger Pro</h1>
            <FormGroup onSubmit = {handleSubmit}>
  
                <div>
                    <Label htmlFor='username'>Username</Label>
                    <Input  onChange= {handleChange} name= 'username' id='username'/>
                </div>

                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange = {handleChange} name='password' type='password' id='password'/>
                </div>

                <Button id='submit'>Submit</Button>

                <p id='error'>{error? error : ''}</p>

            </FormGroup>
        </ModalContainer>
    </ComponentContainer>);
}

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`
