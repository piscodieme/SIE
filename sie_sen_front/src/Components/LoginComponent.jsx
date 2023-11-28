import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSignIn} from 'react-auth-kit';
import UsersService from '../Services/UsersService';
import image1 from "./../images/industrial-refinery-tower-petroleum.jpg"
import image2 from "./../images/istockphoto-928380174-612x612.jpg"
import image3 from "./../images/maroc_energies_propres.jpg"
import image4 from "./../images/image.jpg"
import image5 from "./../images/petrole-plateforme-Hibernia.jpg"
import image6 from "./../images/bg2.jpg"

function LoginComponent() {

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
                Navigate("/accueil");
                window.location.reload();

            }else{
                setResponse(res.data);
                setErrorPopUp(true);
            }
        })
    }
   
  return (
    <div className="myBody">
    <div className="containerr" id='containerr'>
        <div className="form-containerr sign-up">
            <form>
                <h1>Creation de compte</h1>
                <div className="socio-icons">
                    <div class="rs">
                        <a href="#"><i class='bx bxl-linkedin'></i></a>
                        <a href="#"><i class='bx bxl-facebook'></i></a>
                        <a href="#"><i class='bx bxl-twitter' ></i></a>
                        <a href="#"><i class='bx bxl-instagram-alt' ></i></a>
                        <a href="#"><i class='bx bxl-snapchat' ></i></a>
                    </div>
                </div>
                <span>or use your email for registration</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className='myButton'>register</button>
            </form>

        </div>
         <div className="form-containerr sign-in">
            <form>
                <h1 className='myFont'>Connexion</h1>
                <span className='myFont'>Utilisez votre email et mot de passe</span>
                <input 
                    type="email" 
                    placeholder="Saisir l'email" 
                    name='email'
                    value={email} 
                    onChange={handleChangeEmail} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Saisir le mot de passe" 
                    name='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />
                <button type='submit' className='myButton mt-3' onClick={login}>Connecter</button>

            </form>
            
        </div>
        <div className="toggle-containerr">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back</h1>
                    <p>Enter your personal information</p>
                    <button class='hidden myButton' id='login'>Connexion</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1 className='myFont'>Hello</h1>
                    <p className='myFont'>Mettez vos accès pour vous connecter</p>
                    <p className='myFont'>Si vous en disposez pas, veuillez contacter l'administrateur du SIE-UEMOA</p>
                    <button class='hidden myButton' id='register'>register</button>
                </div>
            </div>
        </div>

{/*     
https://www.youtube.com/watch?v=PlpM2LJWu-s  link video
<div className='row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-5 p- loginDesign'>
 */}       {/* <div className=''>
                    <h1>Connexion au SIE</h1>
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

                  </div> */}
{/*                <div className='loginDesign'  Style="marginTop:10%; width:70%; height: 70%;" >
 */}                    {/* <div class="box">
                            <span Style="--i:1"><img src={image1} alt=""/></span>
                            <span Style="--i:2"><img src={image2} alt=""/></span>
                            <span Style="--i:3"><img src={image3} alt=""/></span>
                            <span Style="--i:4"><img src={image4} alt=""/></span>
                            <span Style="--i:5"><img src={image5} alt=""/></span>
                            <span Style="--i:6"><img src={image6} alt=""/></span>
                            <span Style="--i:7"><img src={image3} alt=""/></span>
                            <span Style="--i:7"><img src={image5} alt=""/></span>
                    </div> */}
                {/* </div> */}
        </div>  
        <div class="rs">
                        <a href="#" className='icons'><i class='bx bxl-linkedin'></i></a>
                        <a href="#"><i class='bx bxl-facebook'></i></a>
                        <a href="#"><i class='bx bxl-twitter' ></i></a>
                        <a href="#"><i class='bx bxl-instagram-alt' ></i></a>
                        <a href="#"><i class='bx bxl-snapchat' ></i></a>
                    </div>
                    <span className='text-muted mt-5 text-center'> &copy;.All Rights Reserved Design By Baba Saidou DIEME</span>

    </div>
  )
}
export default LoginComponent;
