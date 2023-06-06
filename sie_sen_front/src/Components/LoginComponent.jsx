import React, { useState } from 'react'
import usersService from '../Services/UsersService';
import { useNavigate } from 'react-router-dom';
import {useSignIn} from 'react-auth-kit';
import Header from './Header';

export default function LoginComponent() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPopUp, setErrorPopUp] = useState(false);
    const [response , setResponse] = useState('');
    const Navigate = useNavigate();
    const signIn = useSignIn();

    const handleChangeEmail = (e) =>{
        let inputEmail = e.target.value;
        setEmail(inputEmail);
        console.log(email);
    }

    const close = () =>{
        setErrorPopUp(false);
    }

    const login = () =>{
        console.log("email ===",email);
        console.log("password ===",password);
        let user = {email:email, password:password};

        usersService.login(user).then((res)=>{
            console.log("login response ======  ",res);
            if(res.data.status === 'ok'){
                let email = res.data.email;
                let prenom = res.data.prenom;
                let nom = res.data.nom;
                let role = res.data.role;
                setResponse(res.data);
                localStorage.setItem("userEmail",email)
                localStorage.setItem("userPrename",prenom)
                localStorage.setItem("userName",nom)
                localStorage.setItem("isLogged",true)
                localStorage.setItem("role",role)
                Navigate("/electricite");
                window.location.reload();
            }
            else{
                setResponse(res.data);
                setErrorPopUp(true);
                Navigate("/");
                
            }
        })
    }
  return (
    <div>
        <section class="vh-100">
        <Header/>
            <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
                    alt="Sample image"/>
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                {errorPopUp && (
                  <div className='bg-light mt-2 mb-2 p-2' Style="border: solid red 1px;height: auto">
                    <span className='text-center danger'>Email or Password Incorrect</span>
                    <button className='btn btn-danger' Style="float:right; color:white" onClick={close}>X</button>
                </div>
                )}
                <form>
                    <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                
                    </div>
        
                
                    <div class="form-outline mb-4">
                    <input type="email" id="form3Example3" class="form-control form-control-lg"
                        placeholder="Enter a valid email address" name="email"
                        value={email} 
                        onChange={handleChangeEmail} 
                        required
                    />
                    <label class="form-label" for="form3Example3">Email address</label>
                    </div>
        
                   
                    <div class="form-outline mb-3">
                    <input type="password" id="form3Example4" class="form-control form-control-lg"
                        placeholder="Enter password"
                        name='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        />
                    <label class="form-label" for="form3Example4">Password</label>
                    </div>
        
                    <div class="d-flex justify-content-between align-items-center">
                  
                    <div class="form-check mb-0">
                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                        <label class="form-check-label" for="form2Example3">
                        Remember me
                        </label>
                    </div>
                    <a href="#!" class="text-body">Forgot password?</a>
                    </div>
        
                    <div class="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" class="btn btn-primary btn-lg"
                        Style="padding-left: 2.5rem; padding-right: 2.5rem;"
                        onClick={login}
                    >
                            Se connecter
                    </button>
                    
                    </div>
        
                </form>
                </div>
            </div>
            </div>
            
        </section>
    </div>
  )
}
