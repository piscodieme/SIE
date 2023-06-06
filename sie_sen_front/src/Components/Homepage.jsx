import React, { Component, useState } from 'react';
import LoginComponent from './LoginComponent';
import { useNavigate } from 'react-router-dom';
import UsersService from '../Services/UsersService';

function Homepage () {
   const [showlog, setShowlog] = useState(false);
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPopUp, setErrorPopUp] = useState(false);
    const [response , setResponse] = useState('');
    const Navigate = useNavigate();
   

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

        UsersService.login(user).then((res)=>{
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
                
                Home Page
                <section class="home">
                
                    <div class="home-content">
                        <h1>Système d'Information Energétique Sénégalais</h1>
                        
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Suscipit sint temporibus veniam laboriosam pariatur quis
                            inventore perspiciatis dolorum, dolores atque reprehenderit
                            rem officia quos mollitia quia veritatis architecto nisi quasi?
                        </p>
                        <div class="btn-box">
                            <button onClick={()=>{setShowlog(true)}}><a href="#">Se Connecter</a></button>
                        </div>
                    </div>
                    {
                  showlog && <div className='loginDesign'>
                    <form>
                        <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                        <h3 class="lead fw-normal me-3 mb-3 deco">Utilisez votre Email et Mot de passe</h3 >
                    
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
                        <button type="submit" class="myButton"
                            Style="padding-left: 2.5rem; padding-right: 2.5rem;"
                            onClick={login}
                        >
                            Login
                        </button>
                    
                    </div>
        
                </form>

                  </div>
                }
                    <div class="rs">
                        <a href="#"><i class='bx bxl-linkedin'></i></a>
                        <a href="#"><i class='bx bxl-facebook'></i></a>
                        <a href="#"><i class='bx bxl-twitter' ></i></a>
                        <a href="#"><i class='bx bxl-instagram-alt' ></i></a>
                        <a href="#"><i class='bx bxl-snapchat' ></i></a>
                    </div>
                </section>
            </div>
        );
    }


export default Homepage;